import { useState, useRef, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import './styles.css'
import { Separator } from '@/components/ui/separator'
import MultipleInput from './MultipleInput'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import verifyFetch from '@/lib/VerifyFetch.js'
import { LoaderCircle } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CodeHighlight from '@/components/CodeHighlight'
import { CopyButton } from '@/components/copy-button'

const methodOptions = [
  { value: 'GET', label: 'GET', class: 'method get' },
  { value: 'POST', label: 'POST', class: 'method post' },
  { value: 'PUT', label: 'PUT', class: 'method put' },
  { value: 'DELETE', label: 'DELETE', class: 'method delete' }
]

const FormApi = (params) => {
  const { defaultUrl } = params

  const [headers, setHeaders] = useState([
    { key: 'Accept', value: '*/*', active: true },
    { key: 'Accept-Encoding', value: 'gzip, deflate, br', active: true }
  ])
  const [url, setUrl] = useState(defaultUrl)
  const [method, setMethod] = useState('GET')
  const [body, setBody] = useState('')
  const [debounce, setDebounce] = useState(null)
  const [verifyResult, setVerifyResult] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [proofResult, setProofResult] = useState(null)
  const [isDialogVerifyOpen, setIsDialogVerifyOpen] = useState(false)

  const formRef = useRef(null)

  /**
   * Generate data from form
   * @returns {Object} data
   */
  const getData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const form = new FormData(formRef.current)
    const url = form.get('url')
    const formMethod = method
    const headersData = headers.filter((header) => header.active).reduce((acc, header) => ({ ...acc, [header.key]: header.value }), {})

    return {
      url,
      method: formMethod,
      headers: headersData,
      body
    }
  }

  const handleTestFetch = async (event) => {
    event.preventDefault()
    setFormLoading(true)
    const data = await getData()

    console.log('formMethod', {
      url: data.url,
      method: data.method,
      headers: data.headers,
      body: data.body
    })

    let result = await verifyFetch(data)
    setFormLoading(false)
    console.log(`result`, result)

    if (result.status === 'success') {
      setVerifyResult(result)
      setIsDialogVerifyOpen(true)
    }
  }

  /**
   *
   *  METHODS
   *
   */
  const handleMethodCHange = (value) => {
    setMethod(value)
  }

  /**
   *
   *  HEADERS
   *
   */
  const handleHeaderChange = (index, event) => {
    if (typeof event === 'boolean') {
      const newHeaders = headers.map((header, i) => {
        if (i === index) {
          return { ...header, active: event }
        }
        return header
      })
      setHeaders(newHeaders)
      return
    }

    const { name, value } = event.target
    const newHeaders = headers.map((header, i) => {
      if (i === index) {
        return { ...header, [name]: value }
      }
      return header
    })
    setHeaders(newHeaders)
  }

  const handleHeaderRemove = (index) => {
    const newHeaders = headers.filter((header, i) => i !== index)
    setHeaders(newHeaders)
  }

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '', active: true }])
  }

  /**
   *
   *  VERIFY DIALOG
   *
   */
  const toggleVerifyDialog = () => {
    setIsDialogVerifyOpen(!isDialogVerifyOpen)
  }

  /**
   *
   *  Handle Save on-chain
   *
   */
  const handleSaveOnChain = async () => {
    console.log('Save on-chain')
    setProofResult(null)
    setFormLoading(true)

    try {
      const data = await getData()
      const response = await fetch(' https://test3-wheat-eight.vercel.app/proof', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const resultSave = await response.json()
      setProofResult(resultSave)
    } catch (error) {
      console.error('Error:', error)
      setProofResult({ error: error.message })
    } finally {
      setFormLoading(false)
    }
  }

  useEffect(() => {
    const delayInput = setTimeout(() => {
      console.log('debounce')
      setDebounce({ method, headers, body })
    }, 100)
    return () => clearTimeout(delayInput)
  }, [method, headers, body, url, formLoading, verifyResult, isDialogVerifyOpen, proofResult])

  return (
    <div className='flex flex-col items-center w-full'>
      <form className='flex flex-col w-full' ref={formRef}>
        <div className='flex flex-row'>
          <div className='w-40 pe-4'>
            <Select defaultValue={method} onValueChange={handleMethodCHange}>
              <SelectTrigger className={methodOptions.find((option) => option.value === method).class}>
                <SelectValue>{method}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {methodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className={option.class}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            className='w-full'
            name='url'
            placeholder='URL'
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
            }}
          />
        </div>

        <Separator className='my-6' />

        <Tabs defaultValue='headers' className='w-full'>
          <TabsList>
            <TabsTrigger value='headers'>Headers</TabsTrigger>
            <TabsTrigger value='body'>Body</TabsTrigger>
          </TabsList>
          <TabsContent value='headers'>
            <h3>Headers</h3>
            <MultipleInput value={headers} onChange={handleHeaderChange} remove={handleHeaderRemove} className='mt-2'>
              <Button className='mt-4 w-full' variant='secondary' type='button' onClick={addHeader}>
                Add Header
              </Button>
            </MultipleInput>
          </TabsContent>
          <TabsContent value='body'>
            <h3 className='mb-4'>Body</h3>
            <Textarea name='body' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Body' />
          </TabsContent>
        </Tabs>

        <Separator className='my-6' />

        <Button onClick={handleTestFetch} disabled={formLoading}>
          {formLoading && <LoaderCircle className='w-6 h-6 animate-spin me-2' />}
          Fetch Data
        </Button>
      </form>

      {verifyResult && (
        <Dialog open={isDialogVerifyOpen} onOpenChange={toggleVerifyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Success Fetching Data</DialogTitle>
            </DialogHeader>
            <CodeHighlight
              code={JSON.stringify(verifyResult.data)}
              language='json'
              className='relative w-[inherit] max-h-[40vh] overflow-x-hidden'
            />
            <DialogHeader>
              <Separator className='my-4' />

              {proofResult !== null && (
                <DialogDescription className='text-success'>
                  {proofResult.success === true && (proofResult?.data?.data?.id || proofResult?.data?.id) && (
                    <div>
                      <div className='flex w-full items-center space-x-2'>
                        <Input
                          className='w-full'
                          value={window?.location?.origin + '/tx/' + (proofResult?.data?.data?.id || proofResult?.data?.id)}
                          readOnly
                        />
                        <CopyButton
                          value={window?.location?.origin + '/tx/' + (proofResult?.data?.data?.id || proofResult?.data?.id)}
                          className='border min-w[100px]'
                        />
                      </div>
                      <p className='text-green-500 text-center mb-4'>Proof successfully saved on-chain</p>
                    </div>
                  )}
                  {(proofResult.success === false || !(proofResult?.data?.data?.id || proofResult?.data?.id)) && (
                    <p className='text-error'>Proof failed to save on-chain</p>
                  )}
                </DialogDescription>
              )}

              <Button variant='default' className='w-full' onClick={handleSaveOnChain} disabled={formLoading}>
                {formLoading && <LoaderCircle className='w-6 h-6 animate-spin me-2' />}
                Save on-chain
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default FormApi

import Container from '@/components/container'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table'
import CodeHighlight from '@/components/CodeHighlight'

const getTransaction = async (txId) => {
  const result = await fetch(`https://test3-wheat-eight.vercel.app/proof/${txId}`).then((res) => res.json())
  return result
}

const TransactionPage = () => {
  const { txId } = useParams()
  const [loading, setLoading] = useState(true)
  const [transaction, setTransaction] = useState(null)

  useEffect(() => {
    console.log(`ue`)
    const fetchTransaction = async () => {
      setLoading(true)
      try {
        const res = await getTransaction(txId)
        setTransaction(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [txId])

  console.log(`render`)

  return (
    <Container className='mt-14'>
      <section className='w-full h-full'>
        <h1 className='text-2xl font-bold tracking-tight pb-4'>Transaction Detail</h1>
        <div className='rounded-[0.5rem] border bg-background shadow w-full h-auto mb-8'>
          <div className='space-y-6 p-10'>
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <div className='flex flex-col items-center w-full'>
                {loading && <p>Loading...</p>}

                {transaction && !loading && (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className='md:min-w[300px]'>Transaction ID</TableCell>
                        <TableCell>{transaction?.id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Proof</TableCell>
                        <TableCell className='w-[100%] max-w-[50vw] relative'>
                          <CodeHighlight
                            code={JSON.stringify(transaction?.proof || {})}
                            language='json'
                            className='relative'
                            copy={false}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Transformed</TableCell>
                        <TableCell className='w-[100%] max-w-[50vw] relative'>
                          <CodeHighlight
                            code={JSON.stringify(transaction?.transformed || {})}
                            language='json'
                            className='relative'
                            copy={false}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default TransactionPage

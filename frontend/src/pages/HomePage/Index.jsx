import Container from '@/components/container'
import { Separator } from '@/components/ui/separator'

import FormApi from './components/FormApi'

import './styles.css'

// dynamic import scene
import React, { Suspense } from 'react'
import { useLocation } from 'react-router-dom'

const HomePage = () => {
  // console.log(useLocation())
  const location = useLocation()
  const params =
    new URLSearchParams(location?.search)?.get('url') || 'https://api.coingecko.com/api/v3/simple/price?ids=stacks&vs_currencies=usd'
  console.log(params)

  return (
    <Container className='flex-col mt-16'>
      <div className='w-full flex flex-col justify-start items-center text-center mb-12'>
        <div className='space-y-2'>
          <h2 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            ProofLink
          </h2>
        </div>
      </div>

      <div className='rounded-xl border border-gray-200 bg-background shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-4xl mx-auto'>
        <div className='space-y-6 p-10 pb-16'>
          <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <FormApi defaultUrl={params} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HomePage

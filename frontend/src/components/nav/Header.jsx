import React from 'react'
import { Link } from 'react-router-dom'
import MainNav from './MainNav'

const Header = () => {
  // top navbar using shadcn
  return (
    <header className='sticky top-0 z-50 w-full border-border/40 backdrop-blur'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <div className='w-full flex justify-between'>
          <div className='flex justify-center'>
            <MainNav />
          </div>

          <Link to={''} target='_blank'>
            <img className='inline-block h-8' src='/assets/stacks.png' />
            <img className='inline-block h-8' src='/assets/icp.png' />
          </Link>
        </div>
      </div>
      <hr className='m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0' />
    </header>
  )
}

export default Header

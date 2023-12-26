
import { Outlet } from 'react-router-dom'
import { Leftsidebar } from './leftsidebar'
import React from 'react'
export const Layout = () => {
    return (
      <div className='flex flex-row  w-full'>
        <div className='w-2/6 lg:w-2/12'>
            <Leftsidebar />
        </div>
        <div className='  flex flex-row h-screen w-full mx-w-4xl '>
          <Outlet />
        </div>
        
      </div>
    )
}

export default Layout


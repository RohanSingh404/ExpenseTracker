import React from 'react'
import { Link } from 'react-router-dom'

const AuthLayout = ({children}) => {
  return (
    <div className='w-screen min-h-screen bg-gradient-to-br from-white to-green-100'>
      {/* Header */}
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-4'>
          <Link to='/'>
            <div className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity'>
              <h1 className='text-xl md:text-2xl font-bold text-gray-900'>
                Expense Tracker
              </h1>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/*children*/}
        <div className='mt-10 flex justify-center items-center'>
          {children}
        </div>
        {/**Image */}
        <div className='hidden md:block bg-white shadow-md border border-gray-200/50'>
          <img 
          src='/Preview-Auth-page.png' 
          alt='ExpenseTrackerPreview' 
          className='w-full object-cover'/>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
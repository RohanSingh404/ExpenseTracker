import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex items-center w-screen h-screen '>
        <div className='flex flex-col gap-25 w-100 h-full md:w-1/2 items-center justify-center'>
          <h1 className='text-lg font-medium'>Expense Tracker</h1>
          {children}
        </div>
        <div className='hidden  w-1/2 h-full md:flex items-center justify-center relative'>
          <img 
            src="Auth-page.png" 
            alt="Auth Image" 
            className='w-full h-[150vh] ml-80 object-cover' 
          />
        </div>
    </div>
  )
}

export default AuthLayout
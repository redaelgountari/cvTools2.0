import React, { Suspense } from 'react'
import Register from '../GenComponents/Register'
import Login from '../GenComponents/Login'

export default function page() {
  return (
    <div className='w-full max-w-md mx-auto'>
      <Suspense fallback={<div className="flex items-center justify-center p-8">Loading...</div>}>
        <Login />
      </Suspense>
    </div>
  )
}

import React from 'react'
import { Login as LoginComponent } from "../components"

function Login() {
  return (
    <div className='min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4'>
      <LoginComponent />
    </div>
  )
}

export default Login
import SignInButton from '@/components/Button/SignInButton'
import React from 'react'
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await auth();
  if(session) redirect('/dashboard')
  return (
    <div className='flex flex-col items-top justify-center '>
    {!session ? <SignInButton/> : <h1>...</h1>}
    </div>
    
  )
}

export default LoginPage
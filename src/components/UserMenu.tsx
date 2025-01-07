'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { LogoutButton } from './Button/Button'

const UserMenu = () => {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { data: session, status } = useSession();
  
    useEffect(() =>  setMounted(true), [])
    const user = session?.user
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';

    if (!mounted) return (
      <div className='placeholder w-12 h-12 bg-transparent'>
      </div>
    )
  return (
    <div
    //  className='flex flex-col gap-2 items-center justify-center relative'
     >
    {status === 'authenticated' && ! open && (
      <div className='w-12 h-12 bg-[var(--dark-green)] flex items-center justify-center rounded-full'
      onClick={() => setOpen(!open)}>
        {userInitial}
      </div>
    )}
    {status === 'authenticated' && open && (
      <div className='p-2 usermenu'>
        <p onClick={() => setOpen(!open)}>{user?.name}</p>
        <LogoutButton/>
      </div>
    )}
    </div>
  )
}

export default UserMenu
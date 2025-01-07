'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const UserMenu = () => {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { data: session, status } = useSession();
  
    useEffect(() =>  setMounted(true), [])
    const user = session?.user
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';
  return (
    <>
    {status === 'authenticated' && (
      <div className='w-12 h-12 bg-[var(--dark-green)] flex items-center justify-center rounded-full'>
        {userInitial}
      </div>
    )}
    </>
  )
}

export default UserMenu
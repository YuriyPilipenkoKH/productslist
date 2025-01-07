'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { LogoutButton } from './Button/Button'
import { cn } from '@/lib/utils'
import Image from 'next/image';

const UserMenu = () => {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { data: session, status } = useSession();
  
    useEffect(() =>  setMounted(true), [])
    const user = session?.user
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';
    const avatar = user?.image 
    console.log(avatar);
    

    if (!mounted) return (
      <div className='placeholder w-12 h-12 bg-transparent'>
      </div>
    )
  return (
    <div className="h-12">
    {status === 'authenticated' && !open && (
      <div onClick={() => setOpen(!open)} className="relative w-12 h-12">
        {avatar ? (
          <Image
            src={avatar}
            alt={user?.name || 'User Avatar'}
            className="rounded-full"
            width={48} // Adjust width and height as per your requirement
            height={48}
          />
        ) : (
          <div
            className={cn(
              'w-12 h-12 bg-[var(--dark-green)] flex items-center justify-center rounded-full'
            )}
          >
            {userInitial}
          </div>
        )}
      </div>
    )}
    {status === 'authenticated' && open && (
      <div className="p-2 usermenu">
        <p onClick={() => setOpen(!open)}>{user?.name}</p>
        <LogoutButton />
      </div>
    )}
  </div>
);
}

export default UserMenu
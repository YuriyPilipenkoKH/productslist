"use client"

import React, { useEffect, useState } from 'react'
// import ThemeChanger from './ThemeChanger'
import { UserButton } from '@clerk/nextjs';
import { retrieveUserId } from '@/lib/retrieveUserId';


function NavBar() {
  const [userId, setUserId] = useState<string | null>(null)

  async function fetchCurrentUser() {
    try {
        const id = await retrieveUserId();
        if (id !== undefined && id !== null) {
            setUserId(id);
        }
    } catch (error) {
        console.error("Error fetching current user:", error);
    }
}
  useEffect(() => {
fetchCurrentUser()

return () => {
    setUserId(null)
};
}, [])

  return (
    <nav className='flex items-center justify-between px-4 pt-4 border-b-violet-400'>
        NavBar
        {/* <ThemeChanger /> */}

        {userId && (
                  <UserButton 
                  afterSignOutUrl="/sign-in"/>
        )}
    </nav>
  )
}

export default NavBar
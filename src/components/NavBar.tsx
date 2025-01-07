"use client"; 
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';
import { LogInButton, LogoutButton } from './Button/Button';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserMenu from './UserMenu';


function NavBar() {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false)

  useEffect(() =>  setMounted(true), [])
  // const {user} = session

  return (
    <nav className='flex items-center justify-between relative p-4 border-b-slate-200'>
        <Logo/>
        <div className='flex gap-4 items-baseline'>
          <ThemeChanger />
          {session
          ? mounted && status === 'authenticated' && <UserMenu/>
          : mounted  && (status === 'unauthenticated') && (currentPath !== '/login') &&  <LogInButton/>}
        </div>
    </nav>
  )
}

export default NavBar


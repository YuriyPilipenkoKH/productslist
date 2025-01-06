"use client"; 
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';
import { LogInButton, LogoutButton } from './Button/Button';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


function NavBar() {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false)

  useEffect(() =>  setMounted(true), [])
  // const {user} = session

  return (
    <nav className='flex items-center justify-between p-4 border-b-slate-200'>
        <Logo/>
        <ThemeChanger />
        {session 
        ? mounted &&  <LogoutButton/> 
        : mounted  && (currentPath !== '/login') &&  <LogInButton/>}   
    </nav>
  )
}

export default NavBar


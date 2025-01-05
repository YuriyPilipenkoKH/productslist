"use client"; 
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';
import { LogInButton, LogoutButton } from './Button/Button';
import { useSession } from "next-auth/react";
import { auth } from '../../auth';
import { usePathname } from 'next/navigation';

interface NavBarProps {
  currentPath: string
}

function NavBar() {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  console.log('currentPath',currentPath);
 
  // const {user} = session

  return (
    <nav className='flex items-center justify-between p-4 border-b-slate-200'>
        <Logo/>
        {session 
        ?  <LogoutButton/> 
        : (currentPath !== '/login') &&  <LogInButton/>}   
        {/* <ThemeChanger /> */}
    </nav>
  )
}

export default NavBar


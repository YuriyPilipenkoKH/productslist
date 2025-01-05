"use client"; 
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';
import { LogInButton, LogoutButton } from './Button/Button';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';


function NavBar() {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  console.log('currentPath',currentPath);
 
  // const {user} = session

  return (
    <nav className='flex items-center justify-between p-4 border-b-slate-200'>
        <Logo/>
        <ThemeChanger />
        {session 
        ?  <LogoutButton/> 
        : (currentPath !== '/login') &&  <LogInButton/>}   
    </nav>
  )
}

export default NavBar


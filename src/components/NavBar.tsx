
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';
import { LogInButton, LogoutButton } from './Button/Button';

import { auth } from '../../auth';

interface NavBarProps {
  currentPath: string
}

async function NavBar({ currentPath }: NavBarProps) {
  // const path = new URL(currentPath).pathname
  console.log('currentPath',currentPath);
  const session = await auth();
  console.log('session',session);
 
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


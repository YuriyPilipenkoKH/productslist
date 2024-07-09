import { UserButton } from '@clerk/nextjs';
import {auth} from '@clerk/nextjs/server'
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';

function NavBar() {
  const {userId} = auth()

  return (
    <nav className='flex items-center justify-between p-4 border-b-slate-200'>
        <Logo/>
        <ThemeChanger />

        {userId && (
                  <UserButton 
                  afterSignOutUrl="/sign-in"/>
        )}
    </nav>
  )
}

export default NavBar
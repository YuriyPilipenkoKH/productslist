
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';
import { LogInButton, LogoutButton } from './Button/Button';

import { auth } from '../../auth';




async function NavBar() {
  const session = await auth();
  console.log('session',session);
 
  // const {user} = session

  return (
    <nav className='flex items-center justify-between p-4 border-b-slate-200'>
        <Logo/>
        {session ? <LogoutButton/> : <LogInButton/>}
          
        {/* <ThemeChanger /> */}

    </nav>
  )
}

export default NavBar


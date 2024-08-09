import { UserButton } from '@clerk/nextjs';
import {auth} from '@clerk/nextjs/server'
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';
import { FlatBackBtn } from './Button/Button';
import { PiArrowFatLinesLeftFill } from 'react-icons/pi';

function NavBar() {
  const {userId} = auth()

  return (
    <nav className='flex items-center justify-between p-4 border-b-slate-200'>
        <Logo/>
          <FlatBackBtn >
              <PiArrowFatLinesLeftFill />
          </FlatBackBtn>
        {/* <ThemeChanger /> */}

        {userId && (
                  <UserButton 
                  afterSignOutUrl="/sign-in"/>
        )}
    </nav>
  )
}

export default NavBar
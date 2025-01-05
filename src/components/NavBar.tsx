
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';
import { FlatBackBtn, LogoutButton } from './Button/Button';
import { PiArrowFatLinesLeftFill } from 'react-icons/pi';



function NavBar() {


  return (
    <nav className='flex items-center justify-between p-4 border-b-slate-200'>
        <Logo/>
          <FlatBackBtn >
              <PiArrowFatLinesLeftFill />
          </FlatBackBtn>
          <LogoutButton/>
        {/* <ThemeChanger /> */}

    </nav>
  )
}

export default NavBar


import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Logo from './Logo';
import ThemeChanger from './ThemeChanger';
import { FlatBackBtn } from './Button/Button';
import { PiArrowFatLinesLeftFill } from 'react-icons/pi';
import dynamic from "next/dynamic";


function NavBar() {


  return (
    <nav className='flex items-center justify-between p-4 border-b-slate-200'>
        <Logo/>
          <FlatBackBtn >
              <PiArrowFatLinesLeftFill />
          </FlatBackBtn>
        <ThemeChanger />
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <SignedOut>
        <SignInButton />
        </SignedOut>
    </nav>
  )
}

export default dynamic (() => Promise.resolve(NavBar), {ssr: false})
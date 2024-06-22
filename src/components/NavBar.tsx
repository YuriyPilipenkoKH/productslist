import React from 'react'
import ThemeChanger from './ThemeChanger'


function NavBar() {
  return (
    <nav className='flex items-center justify-between px-4 pt-4 border-b-violet-400'>
        NavBar
        <ThemeChanger />
    </nav>
  )
}

export default NavBar
'use client'

import { useTheme } from 'next-themes'
import React from 'react'
import { PiHeadlightsBold } from "react-icons/pi";
import { BsMoonStars } from "react-icons/bs";
import { FlatBtn } from './Button/Button';

function ThemeChanger() {
    const { theme, setTheme } = useTheme()
  return (
    <>
    {(theme === 'light') && (
      <FlatBtn onClick={() => setTheme('dark')}>
        
        <PiHeadlightsBold/>
      </FlatBtn>
    )}
    {(theme === 'dark' ) && (
      <FlatBtn onClick={() => setTheme('light')}>
        <BsMoonStars/>
      </FlatBtn>
    )}
    </>
  )
}

export default ThemeChanger
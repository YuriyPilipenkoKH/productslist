'use client'

import { useTheme } from 'next-themes'
import React from 'react'
import { PiHeadlightsBold } from "react-icons/pi";
import { BsMoonStars } from "react-icons/bs";
import { FlatBtn } from './Button/Button';

function ThemeChanger() {
    const { theme, setTheme } = useTheme()
  return (
    <div>
    
      <FlatBtn onClick={() => setTheme('light')}>
        <PiHeadlightsBold/>
      </FlatBtn>
      <FlatBtn onClick={() => setTheme('dark')}>
        <BsMoonStars/>
      </FlatBtn>

    </div>
  )
}

export default ThemeChanger
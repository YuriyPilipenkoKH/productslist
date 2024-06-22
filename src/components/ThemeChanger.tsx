'use client'

import { Button } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import React from 'react'

function ThemeChanger() {
    const { theme, setTheme } = useTheme()
  return (
    <div>
    The current theme is: {theme}
    <Button onClick={() => setTheme('light')}>Light Mode</Button>
    <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
  </div>
  )
}

export default ThemeChanger
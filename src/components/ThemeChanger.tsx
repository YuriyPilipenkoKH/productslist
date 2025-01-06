'use client'

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { PiHeadlightsBold } from "react-icons/pi";
import { BsMoonStars } from "react-icons/bs";


function ThemeChanger() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return (
    <div className='placeholder w-9 h-9 bg-transparent'>
    </div>
  )

  if (resolvedTheme === 'dark') {
    return <BsMoonStars onClick={() => setTheme('light')} />
  }

  if (resolvedTheme === 'light') {
    return <PiHeadlightsBold  onClick={() => setTheme('dark')} />
  }
}

export default ThemeChanger

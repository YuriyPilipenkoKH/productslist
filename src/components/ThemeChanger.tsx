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
    return (
    <div className='my-auto'>
      <BsMoonStars onClick={() => setTheme('light')} />
    </div>
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <div className='my-auto'>
      <PiHeadlightsBold  onClick={() => setTheme('dark')} />
    </div>
    )
  }
}

export default ThemeChanger

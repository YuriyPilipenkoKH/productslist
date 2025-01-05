'use client'
import { ReactNode } from 'react';
import { ThemeProvider  } from 'next-themes';

interface Props {
  children: ReactNode;
}

export function NextThemeProvider({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class" 
      defaultTheme="dark"
      enableSystem
      >
      {children}
    </ThemeProvider>
  )
}

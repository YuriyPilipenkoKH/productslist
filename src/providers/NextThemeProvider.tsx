
import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props {
  children: ReactNode;
}

export function NextThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      // enableSystem
      >
      {children}
    </NextThemesProvider>
  )
}

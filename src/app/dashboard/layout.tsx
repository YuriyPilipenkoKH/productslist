import { Navbar } from '@nextui-org/react';
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
  }

function layout({ children }: Props) {
  return (
    <div>
     {children}   
    </div>
  )
}

export default layout
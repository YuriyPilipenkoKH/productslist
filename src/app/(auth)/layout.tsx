import React, { ReactNode } from 'react'
interface Props {
    children: ReactNode;
  }

function layout({ children }: Props) {
  return (
    <div className='flex flex-col justify-center items-center '>
        {children}
    </div>
  )
}

export default layout
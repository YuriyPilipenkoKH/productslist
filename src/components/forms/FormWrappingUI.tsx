'use client'
import React, { useEffect, useState } from 'react'
import UpdateCategoryForm from './UpdateCategoryForm'
import { MdEditNote } from "react-icons/md";

interface FormWrappingUIProps {
  id:string,
  name: string,
}

const FormWrappingUI:React.FC<FormWrappingUIProps> = ({
	id, name
	}) => {
    const [open, setOpen] = useState(false)    
    const [mounted, setMounted] = useState(false)
      
    useEffect(() =>  setMounted(true), [])
  return (
    <>
    {open ? (
      <UpdateCategoryForm 
      id={id} 
      name={name} />
    ) : (
      <button className='bg-transparent'
      onClick={() =>setOpen(!open)}>
        <MdEditNote />
      </button>
    )}
    </>
  )
}

export default FormWrappingUI
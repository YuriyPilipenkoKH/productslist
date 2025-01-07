'use client'
import React, { useEffect, useState } from 'react'
import UpdateCategoryForm from './UpdateCategoryForm'
import { CiEdit } from "react-icons/ci";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AddNewProductForm from './AddNewProductForm';

interface FormWrappingUIProps {
  id:string,
  name: string,
  formName : 'UpdateCategoryForm' | 'AddNewProductForm'
}

const FormWrappingUI:React.FC<FormWrappingUIProps> = ({
	id, name, formName
	}) => {
    const [open, setOpen] = useState(false)    
    // const [mounted, setMounted] = useState(false)
      
    // useEffect(() =>  setMounted(true), [])
  return (
    <div  className=''>
      <button 
        className='bg-transparent absolute right-2 top-[10px]'
        onClick={() =>setOpen(!open)}>
       {!open ? <CiEdit /> : <AiOutlineCloseCircle/>}
      </button>
    {open && (formName === 'UpdateCategoryForm') && (
      <UpdateCategoryForm 
      id={id} 
      name={name} />
    )}
    {open && (formName === 'AddNewProductForm') && (
      <AddNewProductForm 
      categoryId= {id || ''}/>
    )}
    </div>
  )
}

export default FormWrappingUI
'use client'
import React, { useState } from 'react'
import UpdateCategoryForm from './UpdateCategoryForm'
import { CiEdit } from "react-icons/ci";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AddNewProductForm from './AddNewProductForm';
import { FaRegSquarePlus } from "react-icons/fa6";

interface FormWrappingUIProps {
  id:string,
  name: string,
  formName : 'UpdateCategoryForm' | 'AddNewProductForm'
}

const FormWrappingUI:React.FC<FormWrappingUIProps> = ({
	id, name, formName
	}) => {
    const [open, setOpen] = useState(false)    

  return (
    <div  className=''>
      <button 
        className='bg-transparent absolute right-3 top-[-44px]'
        onClick={() =>setOpen(!open)}>
       {open 
       ? <AiOutlineCloseCircle/> 
       : (formName === 'UpdateCategoryForm')
       ? <CiEdit/>
       : <FaRegSquarePlus/>
       }
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
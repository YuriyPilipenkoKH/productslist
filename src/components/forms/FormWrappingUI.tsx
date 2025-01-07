'use client'
import React from 'react'
import UpdateCategoryForm from './UpdateCategoryForm'

interface FormWrappingUIProps {
  id:string,
  name: string,
}

const FormWrappingUI:React.FC<FormWrappingUIProps> = ({
	id, name
	}) => {
  return (
    <UpdateCategoryForm 
    id={id} 
    name={name} />
  )
}

export default FormWrappingUI
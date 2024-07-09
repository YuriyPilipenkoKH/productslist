'use client'
import { addCategory } from '@/actions/add-category'
import {  Input } from '@nextui-org/react'
import React from 'react'
import { AddNewBtn } from '../Button/Button'
import { Form_AddNewCategory, FormInput } from './FormStyles.styled'




interface AddNewCategoryFormProps {
	creator: string
}

const AddNewCategoryForm: React.FC<AddNewCategoryFormProps> = ({
	creator
	}) => {
  return (
    <Form_AddNewCategory
		action={addCategory}
		className='flex gap-2 items-center'
		autoComplete="off"
		noValidate>
			<input
				hidden
				id='creator'
				name='creator'
				defaultValue={creator}
				/>
			<FormInput 
			name='name'
			id='name'
			placeholder='category name'
			
			/>
			<AddNewBtn 
			type='submit'
						>
				Add</AddNewBtn>
    </Form_AddNewCategory>
  )
}

export default AddNewCategoryForm
'use client'
import { addCategory } from '@/actions/add-category'
import {  Input } from '@nextui-org/react'
import React from 'react'
import { AddNewBtn } from '../Button/Button'




interface AddNewCategoryFormProps {
	creator: string
}

const AddNewCategoryForm: React.FC<AddNewCategoryFormProps> = ({
	creator
	}) => {
  return (
    <form
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
			<Input 
			name='name'
			id='name'
			placeholder='category name'
			
			/>
			<AddNewBtn 
			type='submit'
						>
				Add</AddNewBtn>
    </form>
  )
}

export default AddNewCategoryForm
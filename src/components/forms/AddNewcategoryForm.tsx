import { addCategory } from '@/actions/add-category'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { AddCategoryBtnStyles } from './FormStyles'



interface AddNewCategoryFormProps {
	creator: string
}

const AddNewCategoryForm: React.FC<AddNewCategoryFormProps> = ({
	creator
	}) => {
  return (
    <form
		action={addCategory}
		className='flex gap-2'
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
			<button 
			type='submit'
			style={AddCategoryBtnStyles}
			className='w-46 h-46 rounded-full '
			>
				Add</button>
    </form>
  )
}

export default AddNewCategoryForm
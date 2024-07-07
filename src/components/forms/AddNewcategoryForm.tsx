import { addCategory } from '@/actions/add-category'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

interface AddNewCategoryFormProps {
	creator: string
}

const AddNewCategoryForm: React.FC<AddNewCategoryFormProps> = ({
	creator
	}) => {
  return (
    <form 
		action={addCategory}
		className='flex flex-col gap-2'>
			<input
				hidden
				id='creator'
				name='creator'
				defaultValue={creator}
				/>
			<Input 
			name='name'
			id='name'
			placeholder='category name'/>
			<Button type='submit'>Add New category</Button>
    </form>
  )
}

export default AddNewCategoryForm
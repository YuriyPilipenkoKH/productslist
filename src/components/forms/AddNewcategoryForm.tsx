import { addCategory } from '@/actions/add-category'
import React from 'react'

interface AddNewCategoryFormProps {
	creator: string
}

const AddNewCategoryForm: React.FC<AddNewCategoryFormProps> = ({
	creator
	}) => {
  return (
    <form action={addCategory}>
			<input
				hidden
				id='creator'
				name='creator'
				defaultValue={creator}
				/>
    </form>
  )
}

export default AddNewCategoryForm
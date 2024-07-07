import { deleteCategory } from '@/actions/del-category'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

interface DeleteCategoryFormProps {
	creator: string
}

const DeleteCategoryForm: React.FC<DeleteCategoryFormProps> = ({
	creator
	}) => {
        <form 
		action={deleteCategory }
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
			<Button type='submit'>del category</Button>
    </form>
    }

export default DeleteCategoryForm


import { updateCategory } from '@/actions/update-category'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

interface UpdateCategoryFormProps {
    id:string,
    name: string,
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
	id, name
	}) => {
  return (
    <form 
		action={updateCategory}
		className='flex flex-col gap-2'
		autoComplete='off'
		noValidate>
			<input
				hidden
				name='id'
				id='id'
				defaultValue={id}
				/>
			<Input 
			name='name'
			id='name'
            defaultValue={name}
			placeholder='category name'/>
			<Button type='submit'>update </Button>
    </form>
  )
}

export default UpdateCategoryForm
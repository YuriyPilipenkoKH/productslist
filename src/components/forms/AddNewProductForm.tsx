import { addProduct } from '@/actions/add-product'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
interface ddNewProductFormProps {
	categoryId: string
}


const AddNewProductForm: React.FC<ddNewProductFormProps> = ({
	categoryId
	}) => {
  return (
    <form 
		action={addProduct}
		className='flex  gap-2'
		autoComplete="off"
		noValidate>
			<input
				hidden
				id='categoryId'
				name='categoryId'
				defaultValue={categoryId}
				/>
			<Input 
			name='name'
			id='name'
			placeholder='product name'/>
			<Button type='submit'>Add product</Button>
    </form>
  )
}

export default AddNewProductForm
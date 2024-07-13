'use client'
import { addProduct } from '@/actions/add-product'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addProductSchema, addProductSchemaType } from '@/models/addProduct'
import toast from 'react-hot-toast'
import capitalize from '@/lib/capitalize'
import { AuthError, Form_AddNewCategory, FormInput } from './FormStyles.styled'
import { AddNewBtn } from '../Button/Button'
interface ddNewProductFormProps {
	categoryId: string
}


const AddNewProductForm: React.FC<ddNewProductFormProps> = ({
	categoryId
	}) => {
		const [logError, setLogError] = useState<string>('')
		const {
			register, 
			handleSubmit,
			formState,
			reset,
			watch
		} = useForm<addProductSchemaType>({
			defaultValues: {
				name: '',

			},
				mode:'all',
				resolver: zodResolver(addProductSchema),
		})
		const {
			errors,
			isDirty,
			isValid ,
			isSubmitting,
		} = formState
		const onSubmit = async (data: addProductSchemaType) => {
			const formData = new FormData();
			formData.append('name', data.name);
			formData.append('categoryId', categoryId);

			try {
					const result = await addProduct(formData);
					if (result.success) {
							toast.success(`Category ${capitalize(data.name)} added successfully`!);
							reset();
					} else {
							toast.error(`Failed to add ${capitalize(data.name)} category : ${result.error}`);
					}
        } catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
					toast.error(`An error occurred: ${errorMessage}`);
			}
	};
  return (
    <Form_AddNewCategory 
		onSubmit={handleSubmit(onSubmit)}
		className='flex  gap-2 items-center'
		autoComplete="off"
		noValidate>
			<input
				hidden
				id='categoryId'
				name='categoryId'
				defaultValue={categoryId}
				/>
			<FormInput 
			 {...register('name')}
				 placeholder=	{( isSubmitting ) 
				? "Process" 
				: 'Product name'}
			/>
			<AddNewBtn 
			type='submit'
			disabled={isSubmitting || !isDirty || !isValid}
						>
				Add
			</AddNewBtn>
			<div className='absolute bottom-[-24px]'>
		{( errors?.name ) && (
				<AuthError className="autherror">
					{errors.name && <div>{errors?.name.message}</div>}
				</AuthError>
			)}
		</div>	
    </Form_AddNewCategory >
  )
}

export default AddNewProductForm
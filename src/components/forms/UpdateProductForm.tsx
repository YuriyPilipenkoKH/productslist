'use client'
import { updateCategory } from '@/actions/update-category'
import capitalize from '@/lib/capitalize'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AuthError, Form_Universal, FormInput } from './FormStyles.styled'
import { AddNewBtn } from '../Button/Button'
import { addProductSchema, addProductSchemaType } from '@/models/addProduct'

interface UpdateProductFormProps {
    id:string,
    name: string,
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
	id, name
	}) => {
		const [logError, setLogError] = useState<string>('')
		const {
			register, 
			handleSubmit,
			formState,
			reset,
		} = useForm<addProductSchemaType>({
			defaultValues: {
				name: name,
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

		useEffect(() => {
			reset({ name })
		}, [name, reset])

		const onSubmit = async (data: addProductSchemaType) => {
			const formData = new FormData();
			formData.append('name', data.name);
			formData.append('id', id);

			try {
					const result = await updateCategory(formData);
					if (result.success) {
							toast.success(`Category ${capitalize(name)} updated successfully`!);
							reset();
					} else {
							toast.error(`Failed to update ${capitalize(name)} category : ${result.error}`);
					}
        } catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
					toast.error(`An error occurred: ${errorMessage}`);
			}
	};

  return (
    <Form_Universal
		onSubmit={handleSubmit(onSubmit)}
		className='flex gap-2 items-center'
		autoComplete='off'
		noValidate>
			<input
				hidden
				name='id'
				id='id'
				defaultValue={id}
				/>
			<FormInput 
			 {...register('name')}
				 placeholder=	{( isSubmitting ) 
				? "Process" 
				: '...'}
			/>
			<AddNewBtn 
			type='submit'
			disabled={isSubmitting || !isDirty || !isValid}
						>
				update
			</AddNewBtn>
			<div className='absolute bottom-[-24px]'>
		{( errors?.name ) && (
				<AuthError className="autherror">
					{errors.name && <div>{errors?.name.message}</div>}
				</AuthError>
			)}
		</div>	
    </Form_Universal>
  )
}

export default UpdateProductForm
'use client'
import { updateCategory } from '@/actions/update-category'
import capitalize from '@/lib/capitalize'
import { addNewCategorySchema, addNewCategorySchemaType } from '@/models/addCategory'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AuthError, Form_Universal, FormInput } from './FormStyles.styled'
import { AddNewBtn } from '../Button/Button'

interface UpdateCategoryFormProps {
    id:string,
    name: string,
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
	id, name
	}) => {
		const [logError, setLogError] = useState<string>('')
		const {
			register, 
			handleSubmit,
			formState,
			reset,
		} = useForm<addNewCategorySchemaType>({
			defaultValues: {
				name: name,

			},
				mode:'all',
				resolver: zodResolver(addNewCategorySchema),
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

		const onSubmit = async (data: addNewCategorySchemaType) => {
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
					setLogError(errorMessage)
			}
	};

  return (
    <Form_Universal
		onSubmit={handleSubmit(onSubmit)}
		className='flex gap-2 items-center mb-4'
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
					{!errors && logError && <div>{logError}</div>}
				</AuthError>
			)}
		</div>	
    </Form_Universal>
  )
}

export default UpdateCategoryForm
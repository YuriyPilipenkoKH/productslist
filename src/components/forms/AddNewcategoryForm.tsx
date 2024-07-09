'use client'
import { addCategory } from '@/actions/add-category'
import React, { useState } from 'react'
import { AddNewBtn } from '../Button/Button'
import { AuthError, Form_AddNewCategory, FormInput } from './FormStyles.styled'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addNewCategorySchema, addNewCategorySchemaType } from '@/models/createContact'



interface AddNewCategoryFormProps {
	creator: string
}

const AddNewCategoryForm: React.FC<AddNewCategoryFormProps> = ({
	creator
	}) => {
		const [logError, setLogError] = useState<string>('')
		const {
			register, 
			handleSubmit,
			formState,
			reset,
			watch
		} = useForm<addNewCategorySchemaType>({
			defaultValues: {
				name: '',

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


  return (
    <Form_AddNewCategory
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
			<FormInput 
			 {...register('name')}
			 placeholder='category name'
			 // name='name'
			 // id='name'
			/>
			<AddNewBtn 
			type='submit'
			disabled={isSubmitting || !isDirty || !isValid}
						>
				{( isSubmitting ) 
				? "Process" 
				: "Add" }
			</AddNewBtn>
		<div className='absolute bottom-[-24px]'>
		{( errors?.name ) && (
				<AuthError className="autherror">
					{errors.name && <div>{errors?.name.message}</div>}
				</AuthError>
			)}
		</div>		
    </Form_AddNewCategory>
  )
}

export default AddNewCategoryForm
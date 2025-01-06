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
import { updateProduct } from '@/actions/update-product'
import { wait } from '@/lib/wait'

interface UpdateProductFormProps {
    id:string,
    name: string,
		setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
	id, 
  name,
  setIsSubmitting,
  setOpen
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
			setIsSubmitting(true)
			const formData = new FormData();
			formData.append('name', data.name);
			formData.append('id', id);

			try {
				const result = await updateProduct(formData);
				if (result.success) {
						toast.success(`Product ${capitalize(name)} updated successfully`!);
						reset();
						await wait(1000)
						setOpen(false)
				}
				if (!result.success && result.message) {
					toast.error(result.message);
				} 
				
				if (!result.success && result.error) {
					toast.error(result.error);
				}
			}
			catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
				toast.error(`An error occurred: ${errorMessage}`);
				setLogError(errorMessage)
			}
			finally{
        setIsSubmitting(false)
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
					{!errors && logError && <div>{logError}</div>}
				</AuthError>
			)}
		</div>	
    </Form_Universal>
  )
}

export default UpdateProductForm
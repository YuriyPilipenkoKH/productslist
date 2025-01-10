'use client'
import { deleteCategory } from '@/actions/del-category';
import React, { useEffect, useState } from 'react';
import { ModalDelBtn } from '../Button/Button';
import toast from 'react-hot-toast';
import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';
import { deleteProductsByCategory } from '@/actions/deleteProductsByCategory';

interface DeleteCategoryFormProps {
  id: string;
  name: string
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canceling: boolean
  related: string[] | null
  setRelated: React.Dispatch<React.SetStateAction<string[] | null>>
  }

const DeleteCategoryForm: React.FC<DeleteCategoryFormProps> = ({ 
  id, 
  name,
  setIsSubmitting,
  setOpen,
  canceling,
  related,
  setRelated
 }) => {
      const [logError, setLogError] = useState<string | null>(null)

  console.log('logError ',logError );
  console.log('related in form',related );
 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true)
    const formData = new FormData();
    formData.append('id', id);
   
    try {

      const result = await deleteCategory(formData);
      console.log('result',result );
      
      if (result.success) {
          toast.success(`Category ${capitalize(name)} deleted successfully!`);
          await wait(1000)
          setOpen(false)
      } 
      if (!result.success && result.relatedProducts) {
        setLogError(result.error)

        const relatedProductNames = result.relatedProducts.map((product: { id: string; name: string; categoryId: string }) => product.name);
        setRelated(relatedProductNames)

      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`An error occurred: ${errorMessage}`);
    }
    finally{
      setIsSubmitting(false)
    }
    };
    const handleTotalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true)
      const formData = new FormData();
      formData.append('id', id);
      console.log('total submit')

      try {
        const result = await deleteProductsByCategory(id);
        if (result.success) {
            toast.success(`Category ${capitalize(name)} deleted totally!`);
            setRelated(null)
            setLogError(null)
            await wait(1000)
            setOpen(false)
        } 
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`An error occurred: ${errorMessage}`);
      }
      finally{
        setIsSubmitting(false)
      }
    }  

    useEffect(() => {
      if(canceling) {
        setLogError(null)
        setOpen(false)
      }
      }, [canceling])

  return (
    <div className='flex flex-col gap-4 text-purple-500'>
    <div>{logError }</div>
      <form onSubmit={related ? handleTotalSubmit : handleSubmit}>
        <input
          hidden
          name='id'
          defaultValue={id}
        />
        <ModalDelBtn
         type='submit' >
          {logError ? ' Delete all' : 'Delete'}
        </ModalDelBtn>
      </form>
    </div>
  );
};

export default DeleteCategoryForm;

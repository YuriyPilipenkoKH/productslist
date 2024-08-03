'use client'
import { deleteCategory } from '@/actions/del-category';
import React from 'react';
import { ModalDelBtn } from '../Button/Button';
import toast from 'react-hot-toast';
import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';

interface DeleteCategoryFormProps {
  id: string;
  name: string
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const DeleteCategoryForm: React.FC<DeleteCategoryFormProps> = ({ 
  id, 
  name,
  setIsSubmitting,
  setOpen
 }) => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true)
    const formData = new FormData();
    formData.append('id', id);
   
    try {
        const result = await deleteCategory(formData);
        if (result.success) {
            toast.success(`Category ${capitalize(name)} deleted successfully!`);
            await wait(1000)
            setOpen(false)
        } else {
            toast.error(`Failed to delete ${capitalize(name)} category: ${result.error}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`An error occurred: ${errorMessage}`);
      }
      finally{
        setIsSubmitting(false)
      }
};
  return (
    <form onSubmit={handleSubmit}>
      <input
        hidden
        name='id'
        defaultValue={id}
      />
      <ModalDelBtn
       type='submit' >
        Delete 
      </ModalDelBtn>
    </form>
  );
};

export default DeleteCategoryForm;

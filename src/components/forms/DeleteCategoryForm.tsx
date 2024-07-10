'use client'
import { deleteCategory } from '@/actions/del-category';
import React from 'react';
import { ModalDelBtn } from '../Button/Button';
import toast from 'react-hot-toast';
import capitalize from '@/lib/capitalize';

interface DeleteCategoryFormProps {
  id: string;
  name: string
}

const DeleteCategoryForm: React.FC<DeleteCategoryFormProps> = ({ id, name }) => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
   
    try {
        const result = await deleteCategory(formData);
        if (result.success) {
            toast.success(`Category ${capitalize(name)} deleted successfully!`);

        } else {
            toast.error(`Failed to delete ${capitalize(name)} category: ${result.error}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`An error occurred: ${errorMessage}`);
    }
};
  return (
    <form onSubmit={handleSubmit}
    >
      <input
        hidden
        name='id'
        defaultValue={id}
      />
      <ModalDelBtn
       type='submit'
       >
        Delete 
      </ModalDelBtn>
    </form>
  );
};

export default DeleteCategoryForm;

import { deleteProduct } from '@/actions/del-product';
import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';
import { Button } from '@nextui-org/react';
import React from 'react'
import toast from 'react-hot-toast';
import { ModalDelBtn } from '../Button/Button';

interface DeleteProductFormProps {
    id: string;
    name: string
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const DeleteProductForm: React.FC<DeleteProductFormProps> = ({ 
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
        const result = await deleteProduct(formData);
        if (result.success) {
            toast.success(`Product ${capitalize(name)} deleted successfully!`);
            await wait(1000)
            setOpen(false)
        } else {
            toast.error(`Failed to delete ${capitalize(name)} product: ${result.error}`);
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
  )
}

export default DeleteProductForm
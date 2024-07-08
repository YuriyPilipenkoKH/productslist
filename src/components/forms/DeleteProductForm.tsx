import { deleteProduct } from '@/actions/del-product';
import { Button } from '@nextui-org/react';
import React from 'react'

interface DeleteProductFormProps {
    id: string;
  }

const DeleteProductForm: React.FC<DeleteProductFormProps> = ({ id }) => {
  return (
    <form action={deleteProduct}>
    <input
      hidden
      name='id'
      defaultValue={id}
    />
    <Button
     type='submit'
     variant='light'>
      Delete Category</Button>
  </form>
  )
}

export default DeleteProductForm
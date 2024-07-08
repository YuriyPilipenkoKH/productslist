import { deleteCategory } from '@/actions/del-category';
import { Button, Input } from '@nextui-org/react';
import React from 'react';

interface DeleteCategoryFormProps {
  id: string;
}

const DeleteCategoryForm: React.FC<DeleteCategoryFormProps> = ({ id }) => {
  return (
    <form action={deleteCategory}>
      <input
        hidden
        name='id'
        defaultValue={id}
      />
      <Button
       type='submit'
       variant='light'>
        Delete </Button>
    </form>
  );
};

export default DeleteCategoryForm;

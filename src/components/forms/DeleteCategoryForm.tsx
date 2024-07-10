import { deleteCategory } from '@/actions/del-category';
import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { ModalDelBtn } from '../Button/Button';

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
      <ModalDelBtn
       type='submit'
       >
        Delete 
      </ModalDelBtn>
    </form>
  );
};

export default DeleteCategoryForm;

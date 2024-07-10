import { ModalBaseTypes } from '@/types/modalTypes';

export const DeletingCategoryConfirmProps: ModalBaseTypes = {
  modalName: 'DeletingCategoryConfirm',
  dimentions: ['400px', '300px'],
  title: 'Are you sure deleting',
  text: 'There will be no return....',
  imageUrl: null,
  
};

export const ShowCategoryDetailsProps: ModalBaseTypes = {
  modalName: 'ShowCategoryDetails',
  dimentions: ['400px', '300px'],
  title: 'Details',
  text: 'Are you sure?',
  imageUrl: null,
  
};
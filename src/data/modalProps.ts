import { ModalBaseTypes } from '@/types/modalTypes';

export const DeletingCategoryConfirmProps: ModalBaseTypes = {
  modalName: 'DeletingCategoryConfirm',
  dimentions: ['320px', '180px'],
  title: 'Are you sure deleting',
  text: 'There will be no return....',
  imageUrl: null,
  
};

export const DeletingProductConfirmProps: ModalBaseTypes = {
  modalName: 'DeletingProductConfirm',
  dimentions: ['320px', '200px'],
  title: 'Are you sure deleting',
  text: 'There will be no return....',
  imageUrl: null,
  
};

export const EditProductProps: ModalBaseTypes = {
  modalName: 'EditProduct',
  dimentions: ['320px', '300px'],
  title: 'Update',
  text: 'You can edit anything',
  imageUrl: null,
  
};
export const UpdateImgUrlProps: ModalBaseTypes = {
  modalName: 'UpdateImgUrl',
  dimentions: ['320px', '300px'],
  title: 'Update ImgUrl',
  text: 'You can add any picture',
  imageUrl: null,
  
};
export const ShowCategoryDetailsProps: ModalBaseTypes = {
  modalName: 'ShowCategoryDetails',
  dimentions: ['320px', '300px'],
  title: 'Details',
  text: 'You can edit any field?',
  imageUrl: null,
  
};
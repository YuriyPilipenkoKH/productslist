'use client'
import { Modal } from 'antd';
import React, { useState } from 'react'
import { BtnDelete, CancelBtn, EditBtn} from '../Button/Button';
import { ModalBaseTypes } from '@/types/modalTypes';
import DelIcon from '../icons/DelIcon';
import capitalize from '@/lib/capitalize';
import DeleteCategoryForm from '../forms/DeleteCategoryForm';
import DeleteProductForm from '../forms/DeleteProductForm';
import EditIcon from '../icons/EditIcon';
import { cn } from '@/lib/utils';
import UpdateProductForm from '../forms/UpdateProductForm';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import UploadImgForm from '../forms/UploadImgForm';

interface MainModalProps {
    modalTypes: ModalBaseTypes
    id: string
    name: string
}

const MainModal: React.FC<MainModalProps> = ({ modalTypes, id ,name}) => {
    const {
        modalName, 
        text, 
        title
    } = modalTypes
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [canceling, setCanceling] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    console.log(modalName)

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setCanceling(true)
        setOpen(false);
    };

  return (
    <>
    {(modalName === 'DeletingCategoryConfirm' || modalName === 'DeletingProductConfirm' || modalName === 'EditProduct' || modalName === 'UpdateImgUrl')
    && (
    <BtnDelete
        type="button" 
        onClick={showModal}>
          {(modalName === 'EditProduct') 
          ? <EditIcon/> 
            : (modalName === 'UpdateImgUrl')
            ? <MdOutlineAddAPhoto size={20}/>
          : <DelIcon  />
          }
    </BtnDelete>
    )}

    <Modal
      className={cn('MainModal relative',
        (modalName === 'DeletingCategoryConfirm')  && `delCategoryConfirm`,
        (modalName === 'DeletingProductConfirm')  && `delProductConfirm`,
        (modalName === 'EditProduct')  && `editProduct`,
        (modalName === 'UpdateImgUrl')  && `updateImgUrl`,
        )}
      open={open}
      title={( isSubmitting ) 
        ? (modalName === 'EditProduct') || (modalName === 'UpdateImgUrl')
          ? "updating.." 
          : "moving to trash.." 
        : `${title} ${capitalize(name)} ?`
      }

      onOk={handleOk}
      onCancel={handleCancel}
      footer={[ 
          
      <CancelBtn
          key="back" 
          className='cancel_btn w-[70px] rounded-md '
          disabled={ isSubmitting }
          onClick={handleCancel}>
      Cancel
      </CancelBtn>
         ]}
        >
        <p>
        {( isSubmitting ) 
        ? (modalName === 'EditProduct') || (modalName === 'UpdateImgUrl')
          ? "writing to database.." 
          : "too late.." 
        : text 
        }
        </p>
        {(modalName === 'EditProduct') && (
          <div className='mt-6'>
           <UpdateProductForm 
              id={id}
              name={name}
              setIsSubmitting={setIsSubmitting}
              setOpen={setOpen}
           />     
          </div>
        )}
        {(modalName === 'UpdateImgUrl') && (
          <div className='mt-6'>
            <UploadImgForm
              id={id}
              name={name}
              setIsSubmitting={setIsSubmitting}
              setOpen={setOpen}
            />
          </div>
        )}
        <div className='absolute bottom-[20px]'>
        {(modalName === 'DeletingCategoryConfirm') && (
          <DeleteCategoryForm
            id={id}
            name={name}
            setIsSubmitting={setIsSubmitting}
            setOpen={setOpen}
            />
        )}
        {(modalName === 'DeletingProductConfirm')  && (
          <DeleteProductForm
            id={id}
            name={name}
            setIsSubmitting={setIsSubmitting}
            setOpen={setOpen}
            />
        )}
        </div>
    </Modal>
    </>
  )
}

export default MainModal

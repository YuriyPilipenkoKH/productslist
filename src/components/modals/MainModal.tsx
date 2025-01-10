'use client'
import { Modal } from 'antd';
import React, { useState } from 'react'
import { BtnDelete, CancelBtn, BtnUpdate} from '../Button/Button';
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
import { PicWrapper } from './Modals.styled';
import { AvatarWrap } from '../forms/FormStyles.styled';
import { wait } from '@/lib/wait';


interface MainModalProps {
    modalTypes: ModalBaseTypes
    id: string
    name: string
    imgUrl?: string | null
}
const test = process.env.NEXT_PUBLIC_TESTURL


const MainModal: React.FC<MainModalProps> = ({ modalTypes, id ,name, imgUrl}) => {
    const {
        modalName, 
        text, 
        title,
    } = modalTypes
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [canceling, setCanceling] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [related, setRelated] = useState<string[] | null>(null)

    console.log('related',related );
    const list = related?.slice(0, 2).join(', ');
    
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
    const handleCancel = async() => {
      setCanceling(true)
        await wait(1000) 
        setOpen(false);
        await wait(1000) 
        setRelated(null)
        setCanceling(false)
    };

  return (
    <>
    {(modalName === 'DeletingCategoryConfirm' 
    || modalName === 'DeletingProductConfirm')
    && (
    <BtnDelete
        type="button" 
        onClick={showModal}>
         <DelIcon  />
    </BtnDelete>
    )}
  {(modalName === 'EditProduct' || modalName === 'UpdateImgUrl') && (
    <BtnUpdate type="button" onClick={showModal}>
      {modalName === 'EditProduct' 
      ?   <EditIcon />
      : ( modalName === 'UpdateImgUrl' 
        && ( imgUrl 
          ?  <PicWrapper imgUrl={imgUrl} />
          :  <MdOutlineAddAPhoto size={20} />
        )
      )}
    </BtnUpdate>
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
          className='cancel_btn w-[70px] rounded-md z-10'
          // disabled={ isSubmitting }
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
        : related
          ? `${list} are related products`
          : text    
         }
        {/* text   */}
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
   
          <AvatarWrap
              fileurl={fileUrl}
              imgUrl={imgUrl || test || ''}
              className='mt-6 photo relative h-[200px]'>
              <UploadImgForm
                id={id}
                name={name}
                setIsSubmitting={setIsSubmitting}
                setOpen={setOpen}
                setFileUrl={setFileUrl}
                />
          </AvatarWrap>
       
        )}
        <div className='absolute bottom-[20px]'>
        {(modalName === 'DeletingCategoryConfirm') && (
          <DeleteCategoryForm
            id={id}
            name={name}
            setIsSubmitting={setIsSubmitting}
            setOpen={setOpen}
            canceling ={canceling}
            setRelated={setRelated}
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

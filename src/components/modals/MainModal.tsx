'use client'
import { Modal } from 'antd';
import React, {  useState } from 'react'
import {   Btn, BtnDelete, CancelBtn, EditBtn} from '../Button/Button';

import toast from 'react-hot-toast';

import { ModalBaseTypes } from '@/types/modalTypes';
import DelIcon from '../icons/DelIcon';
import capitalize from '@/lib/capitalize';
import DeleteCategoryForm from '../forms/DeleteCategoryForm';

interface MainModalProps {
    modalTypes: ModalBaseTypes
    id: string
    name: string
}

const MainModal: React.FC<MainModalProps> = ({ modalTypes, id ,name}) => {
    const {
        dimentions, 
        modalName, 
        text, 
        title
    } = modalTypes
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [canceling, setCanceling] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


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
    {(modalName === 'DeletingCategoryConfirm') && (
    <BtnDelete
        type="button" 
        onClick={showModal}>
        <DelIcon  /> delete
    </BtnDelete>
    )}

    <Modal
        className='delModal relative'
        open={open}
        title={( isSubmitting ) 
            ? "Processing" 
            : `${title} ${capitalize(name)}?`}
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
            ? "Too late"
            :text }
        </p>
        <div className='absolute bottom-[20px]'>
            {(modalName === 'DeletingCategoryConfirm') && (
            <DeleteCategoryForm
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

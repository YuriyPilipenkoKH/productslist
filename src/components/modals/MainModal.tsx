'use client'
import { Modal } from 'antd';
import React, {  useContext, useState } from 'react'
import {   Btn, CancelBtn, FlatBtn } from '../Button/Button';
import { LiaEditSolid } from 'react-icons/lia';
import toast from 'react-hot-toast';
// import capitalize from '@/lib/capitalize';
import { dellBtnStyle } from '../Button/Button.styled';


interface MainModalProps {
    modalName: string
    dimentions: string[]    
    title: string
    text: string
    imageUrl: string
    delId: string
}

const MainModal: React.FC<MainModalProps> = ({
    modalName,
    dimentions,
    title,
    text,
    imageUrl,
    delId
}) => {
  
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

    const removal = async() => {
        setLoading(true)
        setIsSubmitting(true)
        try {
           
           }
 
        catch (error) {
            toast.error("Deleting failed")
        }
        finally{
            setIsSubmitting(false)
            setLoading(false);
        }
    };

  return (
    <>
    <FlatBtn 
        type="button" 
        style={dellBtnStyle}
        onClick={showModal}>
        <LiaEditSolid 
            className='visually-hidden'
        />
    </FlatBtn>
    <Modal
        className='AddNew_modal Del_Numbers relative'
        open={open}
        title={( isSubmitting ) 
            ? "Processing" 
            : `Are you sure deleting ?`}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[ 
        <Btn
            key="add" 
            className='addphone_btn w-[70px] rounded-md '
            disabled={ isSubmitting }
            onClick={removal}
            >
            Del
        </Btn>,
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
         There will be no return....
    </p>



    </Modal>
    </>
  )
}

export default MainModal

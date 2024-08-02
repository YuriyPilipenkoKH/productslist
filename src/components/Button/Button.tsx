'use client'
import { SAddNewBtn, SBtn, SBtnDelete, SCancelBtn, SEditBtn, SFlatBtn, SModalDelBtn, SPagBtn } from "./Button.styled";
import { useRouter } from 'next/navigation';
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      children: React.ReactNode;
    }


  export  const Btn: React.FC<ButtonProps> = ({ children, ...props }) => {
    return <SBtn type='button' {...props}> {children}</SBtn>;
  };

  export const BtnDelete: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SBtnDelete type='button' {...props}> {children}</SBtnDelete>;
  };

  export const AddNewBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SAddNewBtn type='button' {...props}> {children}</SAddNewBtn>;
  };
  export const CancelBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SCancelBtn type='button' {...props}> {children}</SCancelBtn>;
  };
  export const ModalDelBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SModalDelBtn type='button' {...props}> {children}</SModalDelBtn>;
  };
  export const EditBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SEditBtn type='button' {...props}> {children}</SEditBtn>;
  };
  export const BackBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
        const router = useRouter()
      return (
        <SEditBtn 
            type='button' 
            {...props}
            onClick={() => router.back()}
        > 
            {children}
        </SEditBtn>
      );
  };
  export const FlatBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
      return <SFlatBtn type='button' {...props}> {children}</SFlatBtn>;
  };
  export const PagBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
    return <SPagBtn type='button' {...props}> {children}</SPagBtn>;
};





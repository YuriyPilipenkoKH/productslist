import React, { useState } from 'react';
import axios from 'axios';
import { uploadImage } from '@/actions/upload-image';
import toast from 'react-hot-toast';
import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';
import { ConfirmBtn } from '../Button/Button';
import { UpSuccessWrap } from './FormStyles.styled';
interface UploadImgFormProps {
    id:string,
    name: string,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFileUrl: React.Dispatch<React.SetStateAction<string>>;
}

const UploadImgForm: React.FC<UploadImgFormProps> = ({
	id, 
    name,
    setIsSubmitting,
    setOpen,
	setFileUrl
	}) => {
    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
				setUploadError(null);
        if (e.target.files && e.target.files[0]) {
				const selectedFile = e.target.files[0];
							setImage(selectedFile);
				setFileUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) {
            setUploadError("Please select an image to upload.");
            return;
        }

        setUploading(true);
        setUploadError(null);
        setUploadSuccess(null);

        const formData = new FormData();
        formData.append('image', image);
				formData.append('id', id);

			try {
				const result = await uploadImage(formData);
				if (result.success) {
						toast.success(`Product ${capitalize(name)} updated successfully`!);
						// reset();
						if(result.updatedProduct?.imageUrl){
							setUploadSuccess(result.updatedProduct?.imageUrl)
						}
						await wait(2000)
						setOpen(false)
				} else {
						toast.error(`Failed to update ${capitalize(name)} product : ${result.error}`);
				}
				}
			catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
					toast.error(`An error occurred: ${errorMessage}`);
			}
			finally {
					setUploading(false);
					setIsSubmitting(false)
					setUploadError(null);
					setUploadSuccess(null);
					await wait(1000)
					setImage(null)
			}
    };

    return (
		<div>
			<form 
				onSubmit={handleSubmit}
				autoComplete="off"
				noValidate>
				<input
					hidden
					name='id'
					id='id'
					defaultValue={id}
					/>
					<input 
					type="file" 
					onChange={handleImageChange} 
					accept="image/*" 
					/>
					<ConfirmBtn 
						className='absolute bottom-[-90px]'
						type="submit" 
						disabled={uploading}>
						Upload
					</ConfirmBtn>
			</form>
			<div className='absolute bottom-[-30px] w-[270px] overflow-hidden text-ellipsis whitespace-nowrap'>
			{uploadSuccess 
				? <UpSuccessWrap >{uploadSuccess}</UpSuccessWrap>	
					: uploading
						? <p>Uploading...</p>
						: null }
				{uploadError && <p style={{ color: 'orangered' }}>{uploadError}</p>}

			</div>
		</div>
    );
};

export default UploadImgForm

import React, { useState } from 'react';
import axios from 'axios';
import { uploadImage } from '@/actions/upload-image';
import toast from 'react-hot-toast';
import capitalize from '@/lib/capitalize';
import { wait } from '@/lib/wait';
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
    const [uploadSuccess, setUploadSuccess] = useState<any>(null);

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e)

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
						await wait(1000)
						setOpen(false)
				} else {
						toast.error(`Failed to update ${capitalize(name)} product : ${result.error}`);
				}
					// setUploadSuccess(response.data);

				}
			catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
					toast.error(`An error occurred: ${errorMessage}`);
			}
			finally {
					setUploading(false);
					setIsSubmitting(false)
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
					<button type="submit" disabled={uploading}>
						Upload
					</button>
			</form>
			{uploading && <p>Uploading...</p>}
			{uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
			{uploadSuccess && <p style={{ color: 'green' }}>Upload successful! URL: {uploadSuccess.secure_url}</p>}
		</div>
    );
};

export default UploadImgForm

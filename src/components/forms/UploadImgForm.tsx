import React, { useState } from 'react';
import axios from 'axios';
interface UploadImgFormProps {
    id:string,
    name: string,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadImgForm: React.FC<UploadImgFormProps> = ({
		id, 
    name,
    setIsSubmitting,
    setOpen
	}) => {
    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<any>(null);

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
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
        formData.append('file', image);
        formData.append('upload_preset', 'your_upload_preset'); // Replace with your upload preset
        formData.append('cloud_name', 'your_cloud_name'); // Replace with your Cloudinary cloud name

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData); // Replace with your Cloudinary URL
            setUploadSuccess(response.data);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setUploadError(error.response?.data?.error?.message || error.message);
            } else if (error instanceof Error) {
                setUploadError(error.message);
            } else {
                setUploadError("An unknown error occurred.");
            }
        } finally {
            setUploading(false);
        }
    };

    return (
		<div>
			<form onSubmit={handleSubmit}>
					<input type="file" onChange={handleImageChange} accept="image/*" />
					<button type="submit" disabled={uploading}>Upload</button>
			</form>
			{uploading && <p>Uploading...</p>}
			{uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
			{uploadSuccess && <p style={{ color: 'green' }}>Upload successful! URL: {uploadSuccess.secure_url}</p>}
		</div>
    );
};

export default UploadImgForm

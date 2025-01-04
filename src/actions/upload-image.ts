'use server'

import prisma from "../../prisma/prisma"
import { revalidatePath } from "next/cache"
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


export const uploadImage = async (formData: FormData) => {
    const image = formData.get('image') as File | null;
    const id = formData.get('id') as string;
  
    if (!image || typeof id !== 'string') {
      throw new Error('Invalid form values');
    }
    
    try {
        const bytes = await image?.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
    
            // Specify a constant filename based on userId
        const filename = `${id}`; // Or use appropriate file extension
    
        // Upload file buffer to Cloudinary using upload_stream
        const result: UploadApiResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { 
            resource_type: "image",
            folder: `productslist/products/${id}`,
            public_id: filename, // Use the constant filename
            overwrite: true, // Specify overwrite to replace existing files
    
          },
          (error?: Error, result?: UploadApiResponse) => {
            if (error) {
              reject(error);
            } 
            else if (result) {
              resolve(result);
            } 
            else {
              reject(new Error("Unknown error occurred during upload"));
            }
          }
        );
        stream.end(buffer);
      });
      console.log(`curl`, result?.secure_url)


      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { imageUrl: result.secure_url }, // Assuming you have an imageUrl field in your product schema
      });
        revalidatePath(`/dashboard`)
        return { success: true, updatedProduct  };
    }
    catch (error) {
        console.log('Error'+ error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        revalidatePath(`/dashboard`)
        return { success: false, error: errorMessage };
    }
    }
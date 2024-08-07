'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export const uploadImage = async (formData: FormData) => {
    const image = formData.get('image') as string;
    const id = formData.get('id') as string;
  
    if (typeof image !== 'string' || typeof id !== 'string') {
      throw new Error('Form values must be strings');
    }
 
    
    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {  }
        })
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
'use server'

import prisma from "../../prisma/prisma"
import { revalidatePath } from "next/cache"


export const updateProduct = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const id = formData.get('id') as string;
  
    if (typeof name !== 'string' || typeof id !== 'string') {
      throw new Error('Form values must be strings');
    }
 
    
    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { name }
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
'use server'

import prisma from "../../prisma/prisma"
import { revalidatePath } from "next/cache"

export const deleteProduct = async (formData: FormData) => {
    const id = formData.get('id') as string;
    if (typeof id !== 'string') {
        throw new Error('Form values must be strings');
      }
    try {
        await prisma.product.delete({
            where: { id }
        })
        return { success: true };
    }
    catch (error) {
        console.error('Error'+ error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }
    finally{
       revalidatePath('/dashboard')
   }
}
'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const addProduct = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const categoryId = formData.get('categoryId') as string;
  
    if (typeof name !== 'string' || typeof categoryId !== 'string') {
      throw new Error('Form values must be strings');
    }
    try {
        const newProduct = await prisma.product.create({
            data: {
                name,
                categoryId
            }
        })
        revalidatePath('/dashboard')
        return { success: true, newProduct };
    }
    catch (error) {
        console.log('Error'+ error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }

}
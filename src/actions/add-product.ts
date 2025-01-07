'use server'

import prisma from "../../prisma/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const addProduct = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const categoryId = formData.get('categoryId') as string;
  
    if (typeof name !== 'string' || typeof categoryId !== 'string') {
      throw new Error('Form values must be strings');
    }
    try {
        const existingProduct = await prisma.product.findFirst({
            where: {
              name: name,
              categoryId: categoryId,
            },
          });
      
          if (existingProduct) {
						return { success: false, message: 'product with this name already exists in the selected category' };
           
          }
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
        console.error('Error'+ error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        revalidatePath('/dashboard')
        return { success: false, error: errorMessage };
    }

}
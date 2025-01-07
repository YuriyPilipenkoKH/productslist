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
      const existingProduct = await prisma.product.findFirst({
          where: {
            name: name,
            
          },
        });
    
        if (existingProduct) {
          return { success: false, message: 'product with this name already exists in the selected category' };
          
        }
      const updatedProduct = await prisma.product.update({
          where: { id },
          data: { name }
      })
      revalidatePath(`/dashboard`)
      return { success: true, updatedProduct  };
    }
    catch (error) {
        console.error('Error'+ error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        revalidatePath(`/dashboard`)
        return { success: false, error: errorMessage };
    }
    }
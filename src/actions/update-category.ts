'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const updateCategory = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const id = formData.get('id') as string;
  
    if (typeof name !== 'string' || typeof id !== 'string') {
      throw new Error('Form values must be strings');
    }

    try {
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: { name }
        })
        revalidatePath(`/dashboard/category/${id}/update`)
        return { success: true, updatedCategory  };
    }
    catch (error) {
        console.log('Error'+ error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        revalidatePath(`/dashboard/category/${id}/update`)
        return { success: false, error: errorMessage };
    }
    // finally{
    //     redirect('/dashboard')
    // }
    }
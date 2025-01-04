'use server'

import prisma from "../../prisma/prisma"
import { revalidatePath } from "next/cache"


export const addCategory = async (formData: FormData) => {
    const name = formData.get('name') 
    const creator = formData.get('creator') 
    console.log(name,creator);
    
  
    try {
        const newCategory = await prisma.category.create({
            data: {
                name: name as string,
                creator: creator as string,
            }
        })
        revalidatePath('/dashboard')
        return { success: true, newCategory };
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
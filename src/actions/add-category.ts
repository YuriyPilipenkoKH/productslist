'use server'

import prisma from "../../prisma/prisma"
import { revalidatePath } from "next/cache"


export const addCategory = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const creator = formData.get('creator') as string;
    const userId = formData.get('userId') as string;
    
    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
                creator,
                userId, // Include `userId` in the data
            },
        })
        revalidatePath('/dashboard')
        return { success: true, newCategory };
    }
     catch (error) {
        console.error('Error'+ error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }
}
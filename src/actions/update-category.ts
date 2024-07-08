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
    }
     catch (error) {
        console.log('Error'+ error)
    }
    revalidatePath('/dashboard')
    redirect('/dashboard')
}
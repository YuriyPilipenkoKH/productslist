'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"

export const deleteCategory = async (formData: FormData) => {
    const id = formData.get('id') as string;
    if (typeof id !== 'string') {
        throw new Error('Form values must be strings');
      }
    console.log(id)
    try {
        await prisma.category.delete({
            where: { id }
        })
    }
     catch (error) {
        console.log('Error'+ error)
    }
    revalidatePath('/dashboard')
    // redirect('/')
}
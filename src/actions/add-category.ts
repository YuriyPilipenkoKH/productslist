'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const addCategory = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const creator = formData.get('creator') as string;
  
    if (typeof name !== 'string' || typeof creator !== 'string') {
      throw new Error('Form values must be strings');
    }
    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
                creator
            }
        })
    }
     catch (error) {
        console.log('Error'+ error)
    }
    revalidatePath('/dashboard')
    redirect('/')
}
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
    }
     catch (error) {
        console.log('Error'+ error)
    }
    revalidatePath('/dashboard')
    redirect('/')
}
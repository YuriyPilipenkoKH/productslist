'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteProduct = async (formData: FormData) => {
    const id = formData.get('id') as string;
    if (typeof id !== 'string') {
        throw new Error('Form values must be strings');
      }
    try {
        await prisma.product.delete({
            where: { id }
        })
    }
     catch (error) {
        console.log('Error'+ error)
    }
    revalidatePath('/dashboard')
}
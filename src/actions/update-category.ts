'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const updateCategory = async (formData: FormData) => {
    const {name, id} = Object.fromEntries(formData)
    console.log(name)
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
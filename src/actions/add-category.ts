'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const addCategory = async (formData: FormData) => {
    const {name, creator} = Object.fromEntries(formData)
    console.log(name, creator)
}
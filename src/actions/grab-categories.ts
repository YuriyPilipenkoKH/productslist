"use server"
import { CategoryWithProducts } from "@/types/Category"
import prisma from "../../prisma/prisma"

export async function grabCategories(creator:string) {
  const categories:CategoryWithProducts[] = await prisma.category.findMany({
    where: {
      creator
    },
    include: {
      products: true, // Include related products
    },
  })
    if(!categories) {
      console.log('categories not found')  
      }
       return categories 
}
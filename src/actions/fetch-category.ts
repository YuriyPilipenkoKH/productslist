"use server"
import prisma from "../../prisma/prisma"

export async function fetchCategory(id:string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true, // Include related products
      },
  })
  if(!category) {
    console.error('category not found')  
    }
    
  return category
}
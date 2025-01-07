"use server"
import prisma from "../../prisma/prisma"

export async function grabProducts(id:string) {
    const products = await prisma.category.findUnique({
      where: { id },
      include: {
          products: true
      }
  })
  if(!products) {
    console.error('products not found')  
    }
  return products
}
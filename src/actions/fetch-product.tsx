"use server"
import prisma from "../../prisma/prisma"

export async function fetchProduct(id:string) {
    const product = await prisma.product.findUnique({
      where: { id },
  })
  if(!product) {
    console.error('product not found')  
    }
  
  return product
}
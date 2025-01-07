"use server"
import prisma from "../../prisma/prisma"

export async function fetchCategory(id:string) {
    const category = await prisma.category.findUnique({
      where: { id },
  })
  if(!category) {
    console.log('category not found')  
    }
    console.log(category);
    
  return category
}
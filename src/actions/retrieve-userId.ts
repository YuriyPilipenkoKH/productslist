"use server"
import prisma from "../../prisma/prisma"

export async function retrieveUserId(email:string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(!user) {
      console.error('User not found')  
      }
       return user?.id 
}
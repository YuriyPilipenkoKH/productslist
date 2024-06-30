"use server"

import { currentUser } from "@clerk/nextjs/server";


export async function retrieveUserId() {
    const user = await currentUser()
    if(!user) {
      console.log('User not found')  
      }
    if(user) {
        console.log('UserID', user?.id);
       return user?.id 
      }
}
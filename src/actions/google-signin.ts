'use server'
import { revalidatePath } from "next/cache";
import { signIn } from "../../auth";

export const googleSignIn = async () => {
  try {
     await signIn("google");
      revalidatePath('/dashboard')
      return { success: true, };
      
  } catch (error) {
    console.log('Error'+ error)
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    revalidatePath('/login')
    return { success: false, error: errorMessage };
  }
}
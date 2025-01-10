'use server'

import prisma from "../../prisma/prisma"
import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"

export const deleteCategory = async (formData: FormData) => {
    const id = formData.get('id') as string;
    if (typeof id !== 'string') {
        throw new Error('Form values must be strings');
      }

    try { 
			// Check for related products
			const relatedProducts = await prisma.product.findMany({
				where: { categoryId: id },
			});
	
			if (relatedProducts.length > 0) {
				return {
					success: false,
					error: "Cannot delete category because it has related products. Please delete the products first.",
				};
			}
	
			// Delete the category
			await prisma.category.delete({
					where: { id }
			})
			return { success: true };
    }
    catch (error) {
			console.error('Error'+ error)
			let errorMessage = 'An unexpected error occurred';
			if (error instanceof Error) {
					errorMessage = error.message;
			}
			return { success: false, error: errorMessage };
    }
    finally{
        revalidatePath('/dashboard')
    }
}

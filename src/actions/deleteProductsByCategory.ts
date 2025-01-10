import { revalidatePath } from "next/cache";
import prisma from "../../prisma/prisma";


export const deleteProductsByCategory = async (categoryId: string) => {
  if (typeof categoryId !== "string") {
    throw new Error("Category ID must be a string");
  }

  try {
    // Delete all related products
    await prisma.product.deleteMany({
      where: { categoryId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error: " + error);
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  } finally {
    revalidatePath("/dashboard");
  }
};

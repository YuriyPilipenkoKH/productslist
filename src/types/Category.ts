import { Category, Product } from '@prisma/client';


export type CategoryWithProducts = Category & {
  products: Product[];
};
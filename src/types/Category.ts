import { Category, Product } from '@prisma/client';


// export interface Category {
//   id: string;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
//   products: Product[];
//   creator: string;
//   userId : string;

// }

export type CategoryWithProducts = Category & {
  products: Product[];
};
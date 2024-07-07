import { Category } from "./Category";

export interface Product {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
    category: Category;
  }
  
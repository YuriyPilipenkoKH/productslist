import { Product } from './Product';

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
  creator: string;
}

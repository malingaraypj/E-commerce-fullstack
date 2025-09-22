import type { Product } from "./product";

export type checkedProduct = {
  product: Product;
  productCount: number;
  createdAt: Date;
};

export type User = {
  name: string;
  email: string;
};

import type { Product } from "./product";

type checkedProduct = {
  product: Product;
  productCount: number;
  createdAt: Date;
};

export interface User {
  name: string;
  email: string;
  checkedProducts: checkedProduct[];
}

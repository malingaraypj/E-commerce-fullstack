import type { Product } from "./product";

export type checkedProduct = {
  product: Product;
  productCount: number;
  createdAt: Date;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "seller";
  phone?: string;
  profilePicture?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  cart: checkedProduct[];
};

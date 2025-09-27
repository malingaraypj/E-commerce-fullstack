export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string[] | string;
  price: number;
  originalPrice?: number;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  stock: number;
  averageRating: number;
  badges?: string[];
};

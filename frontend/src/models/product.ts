export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string[];
  discountedPrice: number;
  originalPrice?: number;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  isAvailable: boolean;
  averageRating: number;
  badges?: string[];
};

import type { Product } from "@/models/product";
import { baseUrl, getData, postData } from "./api";

export const addNewProduct = async (productData: Partial<Product>) => {
  const url = `${baseUrl}/products`;
  return postData(url, productData);
};

export const getProductByCategory = async (
  category: string,
  signal: AbortSignal
) => {
  const url = `${baseUrl}/products?category=${category}`;
  return getData(url, signal);
};

export const getProductById = async (id: string, signal: AbortSignal) => {
  const url = `${baseUrl}/products/${id}`;
  return getData(url, signal);
};

export const getAllReviews = async (id: string, signal: AbortSignal) => {
  const url = `${baseUrl}/products/${id}/review`;
  return getData(url, signal);
};

export const addReview = async (product_id: string, review_text: string) => {
  const url = `${baseUrl}/products/${product_id}/review`;
  return postData(url, { comment: review_text });
};

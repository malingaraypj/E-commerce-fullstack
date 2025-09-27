import { baseUrl, getData } from "./api";

export const getProductByCategory = async (category: string) => {
  const url = `${baseUrl}/products?category=${category}`;
  return getData(url);
};

export const getProductById = async (id: string) => {
  const url = `${baseUrl}/products/${id}`;
  return getData(url);
};

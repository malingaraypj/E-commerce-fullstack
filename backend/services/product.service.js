import AppError from "./../utils/AppError.js";
import Product from "../models/Product.js";

export const addNewProductService = async (productData) => {
  if (!productData || Object.keys(productData).length === 0) {
    throw new AppError("Please provide product details", 400);
  }

  const allowedFields = [
    "name",
    "owner",
    "description",
    "price",
    "category",
    "stock",
    "isAvailable",
  ];

  const filteredData = Object.keys(productData)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = productData[key];
      return obj;
    }, {});

  const newProduct = await Product.create(filteredData);

  return newProduct;
};

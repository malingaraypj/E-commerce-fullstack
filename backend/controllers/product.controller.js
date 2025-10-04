import { deleteOneFactory } from "../factory/deleteFactory.js";
import getAllFactory from "../factory/getAllFactory.js";
import getOneFactory from "../factory/getOneFactory.js";
import { updateOneFactory } from "../factory/updateFactory.js";
import Product from "../models/Product.js";
import { addNewProductService } from "../services/product.service.js";
import catchAsync from "./../utils/catchAsync.js";

export const addNewProduct = catchAsync(async (req, res, next) => {
  const productData = req.body;
  const newProduct = await addNewProductService(productData);

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});

export const getAllProducts = async (req, res, next) => {
  const factory = getAllFactory(Product);

  return factory(req, res, next);
};

export const getProduct = getOneFactory(Product, {
  populate: [{ path: "reviewCount" }],
});

export const updateOneProduct = updateOneFactory(Product);
export const deteleOneProduct = deleteOneFactory(Product);

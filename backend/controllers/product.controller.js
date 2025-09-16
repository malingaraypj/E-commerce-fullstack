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

import getOneFactory from "../factory/getOneFactory.js";
import User from "../models/User.js";
import {
  addCheckoutService,
  createOrderService,
  getMyCheckoutService,
} from "../services/customer.services.js";
import catchAsync from "../utils/catchAsync.js";

export const addCheckout = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.user._id;

  const result = await addCheckoutService(productId, userId);

  res.status(201).json({
    status: "success",
    data: result,
  });
});

export const getMyCheckout = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const result = await getMyCheckoutService(userId);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const applyForSeller = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
});

export const createOrder = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const result = await createOrderService(userId, req.body);

  res.status(201).json({
    status: "success",
    message: "Order placed successfully!",
    data: result,
  });
});

import {
  addCheckoutService,
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

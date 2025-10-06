import { deleteOneFactory } from "../factory/deleteFactory.js";
import getOneFactory from "../factory/getOneFactory.js";
import { updateOneFactory } from "../factory/updateFactory.js";
import User from "../models/User.js";
import {
  myOrderService,
  updateUserService,
} from "../services/user.services.js";
import catcyAsync from "../utils/catchAsync.js";

export const updateOneUser = updateOneFactory(User);
export const deleteOneUser = deleteOneFactory(User);
export const getOneUser = getOneFactory(User, {
  populate: [{ path: "checkedProduct.Product" }],
});

export const getMe = async (req, res, next) => {
  const factory = getOneFactory(User, { filter: { _id: req.user._id } });
  return factory(req, res, next);
};
export const updateMe = catcyAsync(async (req, res, next) => {
  const userId = req.user._id;
  const result = await updateUserService(userId, req.body);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const getMyOrders = async (req, res, next) => {
  const userId = req.user._id;

  const result = await myOrderService(userId);

  res.status(200).json({
    status: "success",
    length: result.length,
    data: result,
  });
};

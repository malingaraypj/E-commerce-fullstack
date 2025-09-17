import getOneFactory from "../factory/getOneFactory.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const addCheckoutService = async (productId, userId) => {
  if (!productId || !userId)
    throw new AppError("please provide valid details.", 400);

  //  check if user exists
  const userExists = await User.exists({ _id: userId });
  if (!userExists) throw new AppError("User doesn't exists", 404);

  //  check if product already exists in user's checkedProduct
  const isChecked = await User.exists({
    _id: userId,
    checkedProduct: { $elemMatch: { Product: productId } },
  });

  let updatedUser;
  if (isChecked) {
    //  update createdAt if already exists
    updatedUser = await User.findOneAndUpdate(
      { _id: userId, "checkedProduct.Product": productId },
      {
        $inc: { "checkedProduct.$.productCount": 1 },
      },
      { new: true, runValidators: true }
    );
  } else {
    //  push new product into checkedProduct array
    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          checkedProduct: { Product: productId, productCount: 1 },
        },
      },
      { new: true, runValidators: true }
    );
  }

  return updatedUser.checkedProduct;
};

export const getMyCheckoutService = async (userId) => {
  if (!userId) throw new AppError("No userId provided", 400);

  // check if user exists
  const user = await User.findById({ _id: userId });
  if (!user) throw new AppError("User doesn't exists", 401);

  return user.checkedProduct;
};

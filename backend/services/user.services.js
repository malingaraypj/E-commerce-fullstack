import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const updateUserService = async (userId, updateData) => {
  if (!userId) throw new AppError("Provide user id");

  // check if user exists
  const user = await User.exists({ _id: userId });
  if (!user) throw new AppError("User doesn't exists");

  const excludeFields = ["password", "role"];
  excludeFields.forEach((field) => delete updateData[field]);

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    updateData,
    { new: true, runValidators: true }
  );

  return updatedUser;
};

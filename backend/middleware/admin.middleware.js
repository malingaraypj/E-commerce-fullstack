import AppError from "../utils/AppError.js";
import User from "./../models/User.js";

export const adminProtect = async (req, res, next) => {
  const userId = req.user._id;

  // check if the logged user is a admin or not
  const user = await User.findById({ _id: userId }).select("+role");
  if (!user) throw new AppError("User not found!.", 404);

  if (user.role !== "admin")
    throw new AppError("user doesn't have permission for this operation", 401);

  next();
};

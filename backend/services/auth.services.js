import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const createUserService = async (userData) => {
  if (!userData || !userData.password || !userData.email) {
    throw new AppError("email or password is wrong", 401);
  }

  // checking if user already exists
  const user = await User.findOne({ email: userData.email });
  if (user) {
    throw new AppError("User already exists", 400);
  }
  const newUser = await User.create(userData);
  return newUser;
};

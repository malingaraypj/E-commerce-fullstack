import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const createUserService = async (userData) => {
  if (!userData || !userData.password || !userData.email) {
    throw new AppError("email or password is wrong", 401);
  }

  // checking if user already exists
  const user = await User.findOne({ email: userData.email });
  if (user) {
    throw new AppError("User already exists", 400);
  }
  // creating a new user
  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role ? userData.role : "customer",
  });
  const token = signToken(newUser._id);
  return { newUser, token };
};

export const loginService = async (email, password) => {
  if (!email || !password) {
    throw new AppError("Invalid email or password", 400);
  }

  // check if user has registered first
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  // compare if password matches with the registered password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 400);
  }

  // sign a token
  const token = signToken(user._id);
  user.password = undefined;

  return { user, token };
};

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // Get token from "Authorization" header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.header("token")) {
    // fallback if you are explicitly sending token in custom header
    token = req.header("token");
  }

  if (!token) {
    return next(new AppError("token was not provides", 401));
  }
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("User no longer exists", 401));
  }

  // check if password has changed in the meantime
  const isChanged = user.isPasswordChanged(decoded.iat);
  if (isChanged) {
    return next(
      new AppError("user has changed password!. please login again", 401)
    );
  }

  // Attach user to request
  req.user = user;
  return next();
});

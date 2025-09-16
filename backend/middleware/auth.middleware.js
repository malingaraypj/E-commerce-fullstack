import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const protect = async (req, res, next) => {
  try {
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
      throw new AppError("token was not provides", 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    // Attach user to request
    req.user = user;
    return next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    throw new AppError("Not authorized to access this route", 401);
  }
};

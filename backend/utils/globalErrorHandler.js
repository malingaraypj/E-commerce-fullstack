import AppError from "./AppError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleTokenExpiredError = () =>
  new AppError("Token expired, please login again", 401);
const handleJsonWebTokenError = () =>
  new AppError("Invalid token, please login again", 401);

const handleDevelopment = (err, req, res, next) => {
  err.statusMessage = err.statusMessage || "Internal server error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
  console.log(err);
};

const handleProduction = (err, req, res, next) => {
  if (err.name === "CastError") err = handleCastErrorDB(err);
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  if (err.name === "TokenExpiredError") err = handleTokenExpiredError();
  if (err.name === "JsonWebTokenError") err = handleJsonWebTokenError();

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
  console.log(err);
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    handleDevelopment(err, req, res, next);
  }
  if (process.env.NODE_ENV === "production") {
    handleProduction(err, req, res, next);
  }
  console.log("catched arr" + err);
  next();
};

export default globalErrorHandler;

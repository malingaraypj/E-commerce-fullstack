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

class AppError extends Error {
  AppError(message, status) {
    super(message);

    this.statusCode = status;
    this.status = `${status}`.startsWith("4") ? "fail" : "error";
    this.operational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

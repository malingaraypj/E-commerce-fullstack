const globalErrorHandler = (err, req, res, next) => {
  console.log("catched arr" + err);
  next();
};

export default globalErrorHandler;

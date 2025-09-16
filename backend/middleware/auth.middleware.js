export const protect = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

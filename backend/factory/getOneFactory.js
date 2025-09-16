import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const getOneFactory = (Model, options = {}) => {
  return catchAsync(async (req, res, next) => {
    // Build filter dynamically
    let filter = {};
    if (req.params.id) filter = { _id: req.params.id };
    if (options.filter) filter = { ...filter, ...options.filter };

    let query = Model.findOne(filter);

    if (options.populate) {
      query = query.populate(options.populate);
    }

    const result = await query;

    if (!result) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: result,
    });
  });
};

export default getOneFactory;

import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const updateOneFactory = (Model) =>
  catchAsync(async (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("ID of the document must be passed", 400));
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const updateManyFactory = (Model, options = {}) =>
  catchAsync(async (req, res, next) => {
    const filter = options.filter || req.body.filter;
    if (!filter) {
      return next(
        new AppError("You must provide a filter for bulk update", 400)
      );
    }

    const result = await Model.updateMany(filter, req.body.update || req.body, {
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      metadata: result, // matchedCount, modifiedCount, etc.
    });
  });

import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const deleteOneFactory = (Model) =>
  catchAsync(async (req, res, next) => {
    if (!req.params.id) {
      console.log(req.params);
      return next(new AppError("Please provide the ID of the document", 400));
    }

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    // 204 = No Content, so we don't send data
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

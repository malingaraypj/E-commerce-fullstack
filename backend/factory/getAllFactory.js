import catcyAsync from "../utils/catchAsync";

const getAllFactory = (Model, option = {}) => {
  return catcyAsync(async (req, res, next) => {
    const result = await Model.find();

    res.status(200).json({
      status: "success",
      data: result,
    });
  });
};

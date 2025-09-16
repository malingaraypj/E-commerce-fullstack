import catcyAsync from "../utils/catchAsync.js";
import ApiFeatures from "../utils/apiFeatures.js";

const getAllFactory = (Model, option = {}) => {
  return catcyAsync(async (req, res, next) => {
    let query = Model.find();
    if (option.populate) query = query.populate(option.populate);
    const apiFeatures = new ApiFeatures(query, req.query)
      .filter()
      .sort()
      .fields()
      .paginate();

    const result = await apiFeatures.query;

    res.status(200).json({
      status: "success",
      data: result,
    });
  });
};

export default getAllFactory;

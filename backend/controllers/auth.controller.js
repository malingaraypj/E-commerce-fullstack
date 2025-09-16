import catchAsync from "../utils/catchAsync.js";
import { createUserService } from "../services/auth.services.js";

export const createUser = catchAsync(async (req, res, next) => {
  const user = await createUserService(req.body);

  res.status(201).json({
    status: "success",
    data: user,
  });
});

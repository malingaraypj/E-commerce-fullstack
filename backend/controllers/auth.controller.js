import catchAsync from "../utils/catchAsync.js";
import { createUserService, loginService } from "../services/auth.services.js";

export const createUser = catchAsync(async (req, res, next) => {
  const { user, token } = await createUserService(req.body);

  res.status(201).json({
    status: "success",
    data: user,
    token,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { token, user } = await loginService(email, password);

  res.status(200).json({
    status: "success",
    data: user,
    token,
  });
});

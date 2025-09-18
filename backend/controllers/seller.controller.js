import { applyToBeSellerService } from "../services/seller.services.js";
import catcyAsync from "../utils/catchAsync.js";

export const applyToBeSeller = catcyAsync(async (req, res, next) => {
  const userId = req.user._id;

  const result = await applyToBeSellerService(userId, req.body);

  res.status(201).json({
    status: "success",
    data: result,
  });
});

import { createReviewService } from "../services/review.services.js";
import catcyAsync from "../utils/catchAsync.js";

export const createReview = catcyAsync(async (req, res, next) => {
  const userId = req.user._id;
  const reviewData = req.body;
  const productId = req.params.productId;

  const review = await createReviewService(reviewData, userId, productId);

  res.status(201).json({
    status: "success",
    data: review,
  });
});

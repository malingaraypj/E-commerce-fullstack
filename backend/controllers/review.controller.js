import { deleteOneFactory } from "../factory/deleteFactory.js";
import getAllFactory from "../factory/getAllFactory.js";
import getOneFactory from "../factory/getOneFactory.js";
import { updateOneFactory } from "../factory/updateFactory.js";
import Review from "../models/Review.js";
import {
  createReviewResponseService,
  createReviewService,
} from "../services/review.services.js";
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

export const getAllReviews = async (req, res, next) => {
  const productId = req.params.productId;
  const factory = getAllFactory(Review, { filter: { product: productId } });

  return factory(req, res, next);
};

export const reviewIdMiddleware = (req, res, next) => {
  if (!req.params.id) req.params.id = req.params.reviewId;
  console.log("middleware");
  next();
};

export const getOneReview = getOneFactory(Review);
export const updateOneReview = updateOneFactory(Review);
export const deleteOneReview = deleteOneFactory(Review);

export const respondToReview = catcyAsync(async (req, res, next) => {
  const userId = req.user._id;
  const reviewId = req.params.reviewId;

  const result = await createReviewResponseService(
    userId,
    reviewId,
    req.body.message
  );

  res.status(201).json({
    status: "success",
    data: result,
  });
});

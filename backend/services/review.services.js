import AppError from "../utils/AppError.js";
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const createReviewService = async (reviewData, userId, productId) => {
  if (!userId) throw new AppError("Please login to do this functionality");
  if (!productId) throw new AppError("Invalid product id");

  // check if product exists
  const product = await Product.exists({ _id: productId });
  if (!product) throw new AppError("Product doesn't exists anymore");

  // check if user exists
  const user = await User.exists({ _id: userId });
  if (!user) throw new AppError("User doesn't exists anymore");

  // check if user has already given review fot this product
  const existingReview = await Review.exists({
    user: userId,
    product: productId,
  });
  if (existingReview)
    throw new AppError("You have already reviewed this product");

  const { comment, rating } = reviewData;
  if (!comment) throw new AppError("Please provide proper comment");
  const review = await Review.create({
    user: userId,
    product: productId,
    comment,
    rating: rating ? rating : 0,
  });
  return review;
};

export const createReviewResponseService = async (
  userId,
  reviewId,
  message
) => {
  if (!userId || !reviewId || !message) {
    throw new AppError("Invalid details provided", 400);
  }

  //  Check if user exists
  const userExists = await User.exists({ _id: userId });
  if (!userExists) throw new AppError("User doesn't exist", 404);

  //  Check if review exists
  const reviewExists = await Review.exists({ _id: reviewId });
  if (!reviewExists) throw new AppError("Review doesn't exist", 404);

  //  Push response into review
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      $push: {
        responses: {
          user: userId,
          message: message,
          createdAt: new Date(),
        },
      },
    },
    { new: true, runValidators: true }
  ).populate("responses.user", "name email");

  return updatedReview;
};

import express from "express";
import {
  createReview,
  deleteOneReview,
  getAllReviews,
  getOneReview,
  respondToReview,
  updateOneReview,
} from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { reviewIdMiddleware } from "../controllers/review.controller.js";

const Router = express.Router({ mergeParams: true });

Router.use(protect);

Router.route("/").post(createReview).get(getAllReviews);

Router.route("/:reviewId")
  .all(reviewIdMiddleware)
  .get(getOneReview)
  .patch(updateOneReview)
  .delete(deleteOneReview);
Router.route("/:reviewId/respond").post(respondToReview);

export default Router;

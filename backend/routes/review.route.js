import express from "express";
import {
  createReview,
  getAllReviews,
  getOneReview,
  respondToReview,
} from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Router = express.Router();

Router.use(protect);
Router.post("/:productId/newReview", createReview);
Router.get("/:productId/allReviews", getAllReviews);
Router.get("/:id", getOneReview);
Router.post("/respondToReview/:reviewId", respondToReview);

export default Router;

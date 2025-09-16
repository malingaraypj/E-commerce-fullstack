import express from "express";
import { createReview } from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Router = express.Router();

Router.use(protect);
Router.post("/:productId/newReview", createReview);

export default Router;

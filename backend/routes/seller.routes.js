import express from "express";
import { applyToBeSeller } from "../controllers/seller.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Router = express.Router();

// user routes
Router.use(protect);
Router.post("/apply-for-seller", applyToBeSeller);

export default Router;

import express from "express";
import {
  addCheckout,
  getMyCheckout,
} from "./../controllers/customer.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const Router = express.Router();

Router.use(protect);
Router.post("/add-checkout/:productId", addCheckout);
Router.get("/my-checkouts", getMyCheckout);

export default Router;

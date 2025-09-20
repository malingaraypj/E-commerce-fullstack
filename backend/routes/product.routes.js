import express from "express";
import {
  addNewProduct,
  deteleOneProduct,
  getAllProducts,
  getProduct,
  updateOneProduct,
} from "../controllers/product.controller.js";
import ReviewRouter from "./review.route.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../services/auth.services.js";

const Router = express.Router();

Router.use("/:productId/review", ReviewRouter);

Router.use(protect);
Router.route("/").post(restrictTo("seller"), addNewProduct).get(getAllProducts);
Router.route("/:id")
  .get(getProduct)
  .patch(restrictTo("seller"), updateOneProduct)
  .delete(restrictTo("seller"), deteleOneProduct);

export default Router;

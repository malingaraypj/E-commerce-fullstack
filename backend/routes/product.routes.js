import express from "express";
import {
  addNewProduct,
  deteleOneProduct,
  getAllProducts,
  getProduct,
  updateOneProduct,
} from "../controllers/product.controller.js";
import ReviewRouter from "./review.route.js";

const Router = express.Router();

Router.use("/:productId/review", ReviewRouter);

Router.route("/").post(addNewProduct).get(getAllProducts);
Router.route("/:id")
  .get(getProduct)
  .patch(updateOneProduct)
  .delete(deteleOneProduct);

export default Router;

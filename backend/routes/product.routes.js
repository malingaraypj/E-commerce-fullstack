import express from "express";
import {
  addNewProduct,
  getAllProducts,
  getProduct,
} from "../controllers/product.controller.js";

const Router = express.Router();

Router.post("/newProduct", addNewProduct);
Router.get("/allProducts", getAllProducts);
Router.get("/:id", getProduct);

export default Router;

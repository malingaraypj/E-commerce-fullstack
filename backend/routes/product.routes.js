import express from "express";
import {
  addNewProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

const Router = express.Router();

Router.post("/newProduct", addNewProduct);
Router.get("/allProducts", getAllProducts);

export default Router;

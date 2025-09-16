import express from "express";
import { addNewProduct } from "../controllers/product.controller.js";

const Router = express.Router();

Router.post("/newProduct", addNewProduct);

export default Router;

import express from "express";
import {
  getAllApplication,
  getAllUsers,
  getOneApplication,
  approveSellerApplication,
  rejectSellerApplication,
  getApprovedSellerApplications,
  getRejectedSellerApplications,
  getPendingSellerApplications,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../services/auth.services.js";
import userRouter from "./user.routes.js";

const Router = express.Router();

Router.use("/users/:id", userRouter);

Router.use(protect);
Router.use(restrictTo("admin"));

Router.get("/users", getAllUsers);

// get seller applications
Router.get("/sellerApplications", getAllApplication);
Router.get("/sellerApplications/approved", getApprovedSellerApplications);
Router.get("/sellerApplications/rejected", getRejectedSellerApplications);
Router.get("/sellerApplications/pending", getPendingSellerApplications);
Router.get("/sellerApplications/:id", getOneApplication);

// approve or reject seller application
Router.patch("/sellerApplications/:id/approve", approveSellerApplication);
Router.patch("/sellerApplications/:id/reject", rejectSellerApplication);

export default Router;

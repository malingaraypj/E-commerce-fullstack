import express from "express";
import { getAllUsers, getOneUser } from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminProtect } from "../middleware/admin.middleware.js";
const Router = express.Router();

Router.use(protect);
Router.use(adminProtect);
Router.get("/getAllUsers", getAllUsers);
Router.get("/getUser/:id", getOneUser);

export default Router;

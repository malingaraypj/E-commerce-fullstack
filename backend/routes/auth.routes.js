import express from "express";
import { createUser, login } from "../controllers/auth.controller.js";

const Router = express.Router();

Router.post("/create-user", createUser);
Router.post("/login", login);

export default Router;

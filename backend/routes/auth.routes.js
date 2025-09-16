import express from "express";
import { createUser } from "../controllers/auth.controller.js";

const Router = express.Router();

Router.post("/create-user", createUser);

export default Router;

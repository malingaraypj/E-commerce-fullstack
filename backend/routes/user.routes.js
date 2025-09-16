import express from "express";

import { getAll } from "../controllers/user.controller.js";

const Router = express.Router();

Router.get("/", getAll);

export default Router;

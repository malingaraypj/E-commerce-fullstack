import express from "express";

import { getAll } from "../controllers/user.routes.js";

const Router = express.Router();

Router.get("/", getAll);

export default Router;

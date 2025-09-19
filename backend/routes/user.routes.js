import express from "express";
import {
  deleteOneUser,
  updateOneUser,
} from "../controllers/user.controller.js";
import { getOneUser } from "../controllers/admin.controller.js";

const router = express.Router({ mergeParams: true });

router.route("/").patch(updateOneUser).get(getOneUser).delete(deleteOneUser);

export default router;

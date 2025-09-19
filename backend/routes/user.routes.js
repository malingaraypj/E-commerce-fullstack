import express from "express";
import {
  deleteOneUser,
  updateOneUser,
} from "../controllers/user.controller.js";
import { getOneUser } from "../controllers/admin.controller.js";
import { restrictTo } from "../services/auth.services.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .all(protect)
  .patch(updateOneUser)
  .get(getOneUser)
  .delete(restrictTo("admin"), deleteOneUser);

export default router;

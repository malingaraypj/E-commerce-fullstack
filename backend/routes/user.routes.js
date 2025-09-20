import express from "express";
import {
  deleteOneUser,
  updateOneUser,
  getOneUser,
  getMe,
  updateMe,
} from "../controllers/user.controller.js";
import { restrictTo } from "../services/auth.services.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .all(protect)
  .patch(restrictTo("admin"), updateOneUser)
  .get(getOneUser)
  .delete(restrictTo("admin"), deleteOneUser);

router.route("/me").all(protect).get(getMe).patch(updateMe);

export default router;

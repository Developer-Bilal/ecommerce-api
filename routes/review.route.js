import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "../controllers/review.controller.js";
import {
  authenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router
  .get("/", isAdminAuthenticated, getReviews)
  .post("/", authenticated, createReview);

router
  .get("/:id", authenticated, getReview)
  .patch("/:id", authenticated, updateReview)
  .delete("/:id", authenticated, deleteReview);

export default router;

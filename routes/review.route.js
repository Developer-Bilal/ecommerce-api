import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "../controllers/review.controller.js";

const router = Router();

router.get("/", getReviews).post("/", createReview);

router
  .get("/:id", getReview)
  .patch("/:id", updateReview)
  .delete("/:id", deleteReview);

export default router;

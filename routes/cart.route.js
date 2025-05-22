import { Router } from "express";
import {
  createCart,
  deleteCart,
  getCart,
  getCarts,
  updateCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCarts).post("/", createCart);

router
  .get("/:id", getCart)
  .patch("/:id", updateCart)
  .delete("/:id", deleteCart);

export default router;

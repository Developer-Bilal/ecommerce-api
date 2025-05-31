import { Router } from "express";
import {
  createCart,
  deleteCart,
  getCart,
  getCarts,
  updateCart,
} from "../controllers/cart.controller.js";
import {
  authenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router
  .get("/", isAdminAuthenticated, getCarts)
  .post("/", authenticated, createCart);

router
  .get("/:id", authenticated, getCart)
  .patch("/:id", authenticated, updateCart)
  .delete("/:id", authenticated, deleteCart);

export default router;

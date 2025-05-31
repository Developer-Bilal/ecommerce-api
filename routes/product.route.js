import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { isSellerAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getProducts).post("/", isSellerAuthenticated, createProduct);

router
  .get("/:id", getProduct)
  .patch("/:id", isSellerAuthenticated, updateProduct)
  .delete("/:id", isSellerAuthenticated, deleteProduct);

export default router;

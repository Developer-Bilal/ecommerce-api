import { Router } from "express";
import {
  createCheckoutSession,
  createPayment,
  deletePayment,
  getPayment,
  getPayments,
  updatePayment,
} from "../controllers/payment.controller.js";
import {
  authenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router
  .get("/", isAdminAuthenticated, getPayments)
  .post("/", authenticated, createPayment);

// router.post("/checkout", createCheckoutSession);

router
  .get("/:id", isAdminAuthenticated, getPayment)
  .patch("/:id", isAdminAuthenticated, updatePayment)
  .delete("/:id", isAdminAuthenticated, deletePayment);

export default router;

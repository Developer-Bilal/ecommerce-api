import { Router } from "express";
import {
  createCheckoutSession,
  createPayment,
  deletePayment,
  getPayment,
  getPayments,
  updatePayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.get("/", getPayments).post("/", createPayment);

router.post("/checkout", createCheckoutSession);

router
  .get("/:id", getPayment)
  .patch("/:id", updatePayment)
  .delete("/:id", deletePayment);

export default router;

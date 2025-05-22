import { Router } from "express";
import {
  createPayment,
  deletePayment,
  getPayment,
  getPayments,
  updatePayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.get("/", getPayments).post("/", createPayment);

router
  .get("/:id", getPayment)
  .patch("/:id", updatePayment)
  .delete("/:id", deletePayment);

export default router;

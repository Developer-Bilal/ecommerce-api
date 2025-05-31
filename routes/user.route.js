import { Router } from "express";
import {
  changePassword,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  authenticated,
  isAdminAuthenticated,
  isSellerAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", isAdminAuthenticated, getUsers).post("/", createUser);

router.post("/login", loginUser);
router.post("/changePassword", authenticated, changePassword);

router
  .get("/:id", authenticated, getUser)
  .patch("/:id", isSellerAuthenticated, updateUser)
  .delete("/:id", isAdminAuthenticated, deleteUser);

export default router;

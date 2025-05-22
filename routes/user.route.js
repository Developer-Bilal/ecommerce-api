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
import { authenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getUsers).post("/", createUser);

router.post("/login", loginUser);
router.post("/changePassword", changePassword);

router
  .get("/:id", authenticated, getUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

export default router;

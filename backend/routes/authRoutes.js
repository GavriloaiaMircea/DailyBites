import express from "express";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", authenticateToken, getCurrentUser);
router.get("/logout", authenticateToken, logoutUser);

export default router;

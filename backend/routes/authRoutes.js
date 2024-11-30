import express from "express";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", authenticateToken, getCurrentUser);

export default router;

import express from "express";
import { searchFood } from "../controllers/searchController.js";

const router = express.Router();

router.get("/search", searchFood);

export default router;

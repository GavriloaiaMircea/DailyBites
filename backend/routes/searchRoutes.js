import express from "express";
import { getFoodDetails, searchFood } from "../controllers/searchController.js";

const router = express.Router();

router.get("/search", searchFood);
router.get("/details/:id", getFoodDetails);

export default router;

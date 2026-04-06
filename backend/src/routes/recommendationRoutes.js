import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();


router.post('/',authenticateToken,getRecommendations);

export default router;
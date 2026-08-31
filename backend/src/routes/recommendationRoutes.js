import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getRecommendations } from "../controllers/recommendationController.js";
import { recommendationLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();


router.post('/',authenticateToken,recommendationLimiter,getRecommendations);

export default router;
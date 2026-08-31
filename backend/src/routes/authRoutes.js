import express from 'express'
import { loginUser, registerUser,deleteUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { loginLimiter,registerLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register',registerLimiter,registerUser)
router.post('/login',loginLimiter,loginUser)

router.delete('/delete', authenticateToken, deleteUser);
export default router;
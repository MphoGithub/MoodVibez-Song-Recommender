import express from 'express'
import { loginUser, registerUser,deleteUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { loginLimiter,registerLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { loginSchema,registerSchema } from '../validators/authSchemas.js';

const router = express.Router();

router.post('/register',registerLimiter,validate(registerSchema),registerUser)
router.post('/login',loginLimiter,validate(loginSchema),loginUser)

router.delete('/delete', authenticateToken, deleteUser);
export default router;
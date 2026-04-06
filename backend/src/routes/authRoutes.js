import express from 'express'
import { loginUser, registerUser,deleteUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)

router.delete('/delete', authenticateToken, deleteUser);
export default router;
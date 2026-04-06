import express from 'express'
import { authenticateToken } from '../middleware/auth.js';
import { getUserProfile, getUsers, updateUserProfile,getCurrentUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile/me',authenticateToken,getCurrentUser);
router.get('/profile/:id',authenticateToken,getUserProfile);
router.get('/profiles',authenticateToken,getUsers)

router.put('/profile/me',authenticateToken,updateUserProfile);

export default router;
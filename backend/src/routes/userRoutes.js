import express from 'express'
import { authenticateToken } from '../middleware/auth.js';
import { getUserProfile, getUsers, updateUserProfile,getCurrentUser } from '../controllers/userController.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema } from '../validators/userSchemas.js';

const router = express.Router();

router.get('/profile/me',authenticateToken,getCurrentUser);
router.get('/profile/:id',authenticateToken,getUserProfile);
router.get('/profiles',authenticateToken,getUsers)

router.put('/profile/me',authenticateToken,validate(updateProfileSchema),updateUserProfile);

export default router;
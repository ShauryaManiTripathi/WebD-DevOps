import express from 'express';
import { signup, signin, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
import { validateSignup, validateSignin, validationHandler } from '../middleware/validators.js';

const router = express.Router();

// Register and login routes
router.post('/signup', validateSignup, validationHandler, signup);
router.post('/signin', validateSignin, validationHandler, signin);

// Get current user
router.get('/me', protect, getMe);

export default router;

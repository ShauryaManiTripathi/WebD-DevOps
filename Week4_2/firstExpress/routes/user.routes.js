import express from 'express';
import {
  getUsers,
  getUser,
  updateProfile
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Librarian routes
router.get('/', protect, authorize('librarian'), getUsers);
router.get('/:id', protect, authorize('librarian'), getUser);

// User routes
router.put('/profile', protect, updateProfile);

export default router;

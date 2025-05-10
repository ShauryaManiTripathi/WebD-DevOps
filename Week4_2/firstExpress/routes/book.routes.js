import express from 'express';
import { 
  getBooks, 
  getBook, 
  createBook, 
  updateBook, 
  deleteBook 
} from '../controllers/book.controller.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateBook, validationHandler } from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.get('/', getBooks);
router.get('/:id', getBook);

// Protected librarian routes
router.post(
  '/', 
  protect, 
  authorize('librarian'), 
  validateBook, 
  validationHandler, 
  createBook
);

router.put(
  '/:id', 
  protect, 
  authorize('librarian'), 
  updateBook
);

router.delete(
  '/:id', 
  protect, 
  authorize('librarian'), 
  deleteBook
);

export default router;

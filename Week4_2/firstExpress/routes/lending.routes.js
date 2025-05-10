import express from 'express';
import {
  getLendingRecords,
  getMyLendingRecords,
  getLendingRecord,
  borrowBook,
  returnBook,
  payFine
} from '../controllers/lending.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Librarian routes
router.get('/', protect, authorize('librarian'), getLendingRecords);
router.put('/:id/pay-fine', protect, authorize('librarian'), payFine);

// Reader routes
router.get('/my-books', protect, authorize('reader'), getMyLendingRecords);

// Mixed routes
router.post('/', protect, borrowBook);
router.get('/:id', protect, getLendingRecord);
router.put('/:id/return', protect, returnBook);

export default router;

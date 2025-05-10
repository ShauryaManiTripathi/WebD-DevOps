import Lending from '../models/Lending.js';
import Book from '../models/Book.js';
import Reader from '../models/Reader.js';

// @desc    Get all lending records
// @route   GET /api/lending
// @access  Private (Librarians only)
export const getLendingRecords = async (req, res) => {
  try {
    // Build query
    const query = {};
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by user
    if (req.query.reader) {
      query.reader = req.query.reader;
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const lendings = await Lending.find(query)
      .populate('book', 'title isbn author')
      .populate('reader', 'name email')
      .populate('processedBy', 'name')
      .sort({ borrowDate: -1 })
      .skip(startIndex)
      .limit(limit);
    
    // Get total count
    const total = await Lending.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: lendings.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: lendings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user's lending records
// @route   GET /api/lending/my-books
// @access  Private (Readers only)
export const getMyLendingRecords = async (req, res) => {
  try {
    const lendings = await Lending.find({ reader: req.user.id })
      .populate('book', 'title isbn author coverImage')
      .sort({ borrowDate: -1 });
    
    res.status(200).json({
      success: true,
      count: lendings.length,
      data: lendings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single lending record
// @route   GET /api/lending/:id
// @access  Private
export const getLendingRecord = async (req, res) => {
  try {
    const lending = await Lending.findById(req.params.id)
      .populate('book', 'title isbn author')
      .populate('reader', 'name email')
      .populate('processedBy', 'name');
    
    if (!lending) {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }
    
    // Check if user is authorized to view this record
    if (req.user.role === 'reader' && lending.reader.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this record',
      });
    }
    
    res.status(200).json({
      success: true,
      data: lending,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Borrow a book
// @route   POST /api/lending
// @access  Private
export const borrowBook = async (req, res) => {
  try {
    const { bookId, readerId } = req.body;
    
    // Check if book exists and is available
    const book = await Book.findById(bookId);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    
    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Book is not available for borrowing',
      });
    }
    
    // Check if reader exists
    const reader = req.user.role === 'reader' ? 
      await Reader.findById(req.user.id) : 
      await Reader.findById(readerId);
    
    if (!reader) {
      return res.status(404).json({
        success: false,
        message: 'Reader not found',
      });
    }
    
    // If reader is borrowing directly, use their ID
    const readerToUse = req.user.role === 'reader' ? req.user.id : readerId;
    
    // Calculate due date (default to 14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    
    // Create lending record
    const lending = await Lending.create({
      book: bookId,
      reader: readerToUse,
      dueDate,
      processedBy: req.user.id,
      status: 'borrowed',
    });
    
    // Update book available copies
    await Book.findByIdAndUpdate(bookId, {
      $inc: { availableCopies: -1 },
    });
    
    // Update reader's borrowed books
    await Reader.findByIdAndUpdate(readerToUse, {
      $push: { borrowedBooks: lending._id },
    });
    
    res.status(201).json({
      success: true,
      data: lending,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Return a book
// @route   PUT /api/lending/:id/return
// @access  Private
export const returnBook = async (req, res) => {
  try {
    const lending = await Lending.findById(req.params.id);
    
    if (!lending) {
      return res.status(404).json({
        success: false,
        message: 'Lending record not found',
      });
    }
    
    // Check if book is already returned
    if (lending.status === 'returned') {
      return res.status(400).json({
        success: false,
        message: 'Book has already been returned',
      });
    }
    
    // Check authorization - only librarians or the reader who borrowed can return
    if (req.user.role === 'reader' && lending.reader.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to return this book',
      });
    }
    
    // Calculate fine if overdue
    let fineAmount = 0;
    if (new Date() > lending.dueDate) {
      // $1 per day overdue
      const daysLate = Math.ceil(
        (new Date() - lending.dueDate) / (1000 * 60 * 60 * 24)
      );
      fineAmount = daysLate;
    }
    
    // Update lending record
    const updatedLending = await Lending.findByIdAndUpdate(
      req.params.id,
      {
        status: 'returned',
        returnDate: new Date(),
        'fine.amount': fineAmount,
      },
      { new: true }
    );
    
    // Update book available copies
    await Book.findByIdAndUpdate(lending.book, {
      $inc: { availableCopies: 1 },
    });
    
    // Update reader's fines if applicable
    if (fineAmount > 0) {
      await Reader.findByIdAndUpdate(lending.reader, {
        $inc: { fines: fineAmount },
      });
    }
    
    // Remove book from reader's borrowed books
    await Reader.findByIdAndUpdate(lending.reader, {
      $pull: { borrowedBooks: lending._id },
    });
    
    res.status(200).json({
      success: true,
      data: updatedLending,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Pay fine for a lending
// @route   PUT /api/lending/:id/pay-fine
// @access  Private (Librarians only)
export const payFine = async (req, res) => {
  try {
    const lending = await Lending.findById(req.params.id);
    
    if (!lending) {
      return res.status(404).json({
        success: false,
        message: 'Lending record not found',
      });
    }
    
    // Check if there's a fine to pay
    if (lending.fine.amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No fine to pay',
      });
    }
    
    // Check if fine is already paid
    if (lending.fine.paid) {
      return res.status(400).json({
        success: false,
        message: 'Fine has already been paid',
      });
    }
    
    // Update lending record
    const updatedLending = await Lending.findByIdAndUpdate(
      req.params.id,
      {
        'fine.paid': true,
      },
      { new: true }
    );
    
    // Update reader's fines
    await Reader.findByIdAndUpdate(lending.reader, {
      $inc: { fines: -lending.fine.amount },
    });
    
    res.status(200).json({
      success: true,
      data: updatedLending,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import { body, validationResult } from 'express-validator';

export const validateSignup = [
  body('name').trim().not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const validateSignin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required'),
];

export const validateBook = [
  body('isbn').not().isEmpty().withMessage('ISBN is required'),
  body('title').trim().not().isEmpty().withMessage('Title is required'),
  body('author').trim().not().isEmpty().withMessage('Author is required'),
  body('genre').isArray().withMessage('Genre must be an array'),
];

// Validation error handler
export const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

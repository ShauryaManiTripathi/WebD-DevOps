/**
 * Check if user is a librarian
 */
export const isLibrarian = (req, res, next) => {
  if (req.user && req.user.role === 'librarian') {
    return next();
  }
  res.status(403).json({
    success: false,
    message: 'Access denied. Librarians only.',
  });
};

/**
 * Check if user is a reader
 */
export const isReader = (req, res, next) => {
  if (req.user && req.user.role === 'reader') {
    return next();
  }
  res.status(403).json({
    success: false,
    message: 'Access denied. Readers only.',
  });
};

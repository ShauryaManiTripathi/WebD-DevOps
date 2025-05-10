import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a book title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
    },
    publishedYear: {
      type: Number,
    },
    genre: {
      type: [String],
      required: [true, 'Please add at least one genre'],
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    copies: {
      type: Number,
      default: 1,
      min: 0,
    },
    availableCopies: {
      type: Number,
      default: 1,
      min: 0,
    },
    location: {
      section: String,
      shelf: String,
      position: String,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for book status
bookSchema.virtual('status').get(function () {
  if (this.availableCopies === 0) return 'Unavailable';
  if (this.availableCopies < this.copies) return 'Partly Available';
  return 'Available';
});

// Index for searching
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

const Book = mongoose.model('Book', bookSchema);

export default Book;

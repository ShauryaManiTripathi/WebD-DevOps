import mongoose from 'mongoose';
import User from './User.js';

const readerSchema = new mongoose.Schema({
  membershipDate: {
    type: Date,
    default: Date.now,
  },
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lending',
    },
  ],
  fines: {
    type: Number,
    default: 0,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  phoneNumber: String,
});

const Reader = User.discriminator('Reader', readerSchema);

export default Reader;

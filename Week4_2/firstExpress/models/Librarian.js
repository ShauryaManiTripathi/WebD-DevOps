import mongoose from 'mongoose';
import User from './User.js';

const librarianSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    enum: ['Management', 'Circulation', 'Technical Services', 'Reference'],
    default: 'Circulation',
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
  specialty: String,
});

const Librarian = User.discriminator('Librarian', librarianSchema);

export default Librarian;

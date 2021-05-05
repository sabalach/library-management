const mongoose = require('mongoose');

const BookLogSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
  borrowedDate: Date,
  returnedDate: Date,
});

module.exports = mongoose.model('BookLog', BookLogSchema);

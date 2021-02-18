const mongoose = require('mongoose');

const BookLogSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  borrowedDate: Date,
  returnedDate: Date,
});

module.exports = mongoose.model('BookLog', BookLogSchema);

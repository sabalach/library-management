const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  serialNumber: String,
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE'],
  },
});

module.exports = mongoose.model('Student', StudentSchema);

const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  class: Number,
  serialNumber: String,
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE'],
  },
  deleted: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Student', StudentSchema);

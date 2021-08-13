const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  isbn: String,
  condition: String,
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  deleted: Boolean,
});

module.exports = mongoose.model('Book', BookSchema);

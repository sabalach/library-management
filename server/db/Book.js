const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  isbn: String,
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Book', BookSchema);

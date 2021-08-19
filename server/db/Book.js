const mongoose = require('mongoose');
const AutoIncrement = require('./AutoIncrement');

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  isbn: String,
  condition: String,
  deleted: Boolean,
});

BookSchema.plugin(AutoIncrement, { id: 'book_sn', inc_field: 'serialNumber', start_seq: 1000 });

module.exports = mongoose.model('Book', BookSchema);

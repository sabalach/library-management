const mongoose = require('mongoose');
const Book = require('./Book');
const Student = require('./Student');
const BookLog = require('./BookLog');

mongoose.Promise = global.Promise;

const startDB = ({
  // user, pwd,
  url,
  db,
}) => mongoose.connect(`mongodb://${url}/${db}`);

const models = {
  Book,
  Student,
  BookLog,
};

module.exports = {
  models,
  startDB,
};

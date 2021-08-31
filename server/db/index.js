const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Book = require('./Book');
const Student = require('./Student');
const BookLog = require('./BookLog');
const Department = require('./Department');
const Level = require('./Level');

mongoose.Promise = global.Promise;

const startDB = ({
  // user, pwd,
  url,
  db,
}) => mongoose.connect(`mongodb://${url}/${db}`).then((database) => {
  const gfs = Grid(mongoose.connection.db, mongoose.mongo);
  return {
    gfs,
    db: database,
  };
});

const models = {
  Book,
  Student,
  BookLog,
  Department,
  Level,
};

module.exports = {
  models,
  startDB,
};

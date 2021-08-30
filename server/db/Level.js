const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
  name: String,
  abbreviation: String,
  validUpto: String,
});

module.exports = mongoose.model('Level', LevelSchema);

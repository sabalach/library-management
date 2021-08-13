const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: String,
  abbreviation: String,
});

module.exports = mongoose.model('Department', DepartmentSchema);

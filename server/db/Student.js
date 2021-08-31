const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE'],
  },
  levelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  serialNumber: String,
  address: String,
  dob: String,
  contactNumber: String,
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fs.files',
  },
  validUpto: String,
  feePaidUpto: Number,
  deleted: Boolean,
});

module.exports = mongoose.model('Student', StudentSchema);

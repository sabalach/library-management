const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
  address: String,
  dob: String,
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fs.files',
  },
  validUpto: String,
  deleted: Boolean,
});

StudentSchema.plugin(AutoIncrement, { inc_field: 'serialNumber', start_seq: 10000 });

module.exports = mongoose.model('Student', StudentSchema);

const Student = require('../../db/Student');

module.exports = {
  Query: {
    async getStudents() {
      return Student.find({ deleted: false });
    },
    async getStudent(_, { id }) {
      return Student.findById(id);
    },
  },
  Mutation: {
    async addStudent(_, { name, grade, gender }) {
      const newStudent = new Student({
        name,
        grade,
        gender,
        serialNumber: (new Date()).getTime().toString(),
        deleted: false,
      });
      const res = await newStudent.save();
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async updateStudent(_, { id, ...args }) {
      const res = await Student.findByIdAndUpdate(id, {
        ...args,
      }, { new: true });
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async deleteStudent(_, { id }) {
      await Student.findByIdAndUpdate(id, {
        deleted: true,
      }, { new: true });
      return true;
    },
  },
};

const Department = require('../../db/Department');

module.exports = {
  Query: {
    async getDepartments() {
      return Department.find();
    },
    async getDepartment(_, { id }) {
      return Department.findById(id);
    },
  },
  Mutation: {
    async addDepartment(_, { name, abbreviation }) {
      const newDepartment = new Department({
        name,
        abbreviation,
      });
      const res = await newDepartment.save();
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async updateDepartment(_, { id, ...args }) {
      const res = await Department.findByIdAndUpdate(id, {
        ...args,
      }, { new: true });
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async deleteDepartment(_, { id }) {
      await Department.findByIdAndUpdate(id, {
        deleted: true,
      }, { new: true });
      return true;
    },
  },
};

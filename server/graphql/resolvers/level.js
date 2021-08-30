const Level = require('../../db/Level');

module.exports = {
  Query: {
    async getLevels() {
      return Level.find();
    },
    async getLevel(_, { id }) {
      return Level.findById(id);
    },
  },
  Mutation: {
    async addLevel(_, { name, abbreviation, validUpto }) {
      const newLevel = new Level({
        name,
        abbreviation,
        validUpto,
      });
      const res = await newLevel.save();
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async updateLevel(_, { id, ...args }) {
      const res = await Level.findByIdAndUpdate(id, {
        ...args,
      }, { new: true });
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async deleteLevel(_, { id }) {
      await Level.findByIdAndDelete(id);
      return true;
    },
  },
};

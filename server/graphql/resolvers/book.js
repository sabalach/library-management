const Book = require('../../db/Book');

module.exports = {
  Query: {
    async getBooks(_, { condition }) {
      let query = { deleted: false };
      if (condition) {
        query = {
          ...query,
          condition,
        };
      }
      return Book.find(query);
    },
    async getBook(_, { id }) {
      return Book.findById(id);
    },
  },
  Mutation: {
    async addBook(_, {
      name, author, isbn, condition,
    }) {
      console.log({
        name, author, isbn, condition,
      });
      const newBook = new Book({
        name,
        author,
        isbn,
        condition,
        serialNumber: (new Date()).getTime().toString(),
        deleted: false,
      });
      const res = await newBook.save();
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async updateBook(_, { id, ...args }) {
      const res = await Book.findByIdAndUpdate(id, {
        ...args,
      }, { new: true });
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async deleteBook(_, { id }) {
      await Book.findByIdAndUpdate(id, {
        deleted: true,
      }, { new: true });
      return true;
    },
  },
};

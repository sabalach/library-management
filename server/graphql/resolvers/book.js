const Book = require('../../db/Book');

module.exports = {
  Query: {
    async getBooks() {
      return Book.find({});
    },
    async getBook(_, { id }) {
      return Book.findById(id);
    },
  },
  Mutation: {
    async addBook(_, { name, author, isbn }) {
      const newBook = new Book({
        name,
        author,
        isbn,
        serialNumber: (new Date()).getTime().toString(),
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
      await Book.findByIdAndDelete(id);
      return true;
    },
  },
};

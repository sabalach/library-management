const { UserInputError } = require('apollo-server-express');
const BookLog = require('../../db/BookLog');
const Book = require('../../db/Book');
const Student = require('../../db/Student');

module.exports = {
  Query: {
    async getBookLogs() {
      return BookLog.find({});
    },
    async getBookLog(_, { id }) {
      return BookLog.findById(id);
    },
  },
  BookLog: {
    async student(parent) {
      return Student.findById(parent.studentId);
    },
    async book(parent) {
      return Book.findById(parent.bookId);
    },
  },
  Mutation: {
    async borrowBook(_, { studentSerialNumber, bookSerialNumber }) {
      const student = await Student.findOne({ serialNumber: studentSerialNumber });
      if (!student) {
        throw new UserInputError('Student not found.');
      }
      const book = await Book.findOne({ serialNumber: bookSerialNumber });
      if (!book) {
        throw new UserInputError('Book not found.');
      }
      const existingBookLog = await BookLog.findOne({
        studentId: student._id,
        bookId: book._id,
        returnedDate: null,
      });
      if (existingBookLog) {
        throw new UserInputError('Book already borrowed');
      }
      const newBookLog = new BookLog({
        studentId: student._id,
        bookId: book._id,
        borrowedDate: new Date(),
        returnedDate: null,
      });
      const res = await newBookLog.save();
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async returnBook(_, { bookSerialNumber }) {
      const book = await Book.findOne({ serialNumber: bookSerialNumber });
      if (!book) {
        throw new UserInputError('Book not found.');
      }
      const bookLog = await BookLog.findOne({ bookId: book._id, returnedDate: null });
      if (!bookLog) {
        throw new UserInputError('Book not borrowed');
      }
      const res = await BookLog.findByIdAndUpdate(bookLog._id, {
        returnedDate: new Date(),
      }, { new: true });
      return {
        id: res._id,
        ...res._doc,
      };
    },
  },
};

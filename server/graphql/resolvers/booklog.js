const { UserInputError } = require('apollo-server-express');
const BookLog = require('../../db/BookLog');
const Book = require('../../db/Book');
const Student = require('../../db/Student');
const lowDb = require('../../lowDb');

module.exports = {
  Query: {
    async getBookLogs(_, { studentSerialNumber }) {
      let args = {};
      if (studentSerialNumber) {
        const student = await Student.findOne({ serialNumber: studentSerialNumber });
        if (!student) {
          throw new UserInputError('Student not found.');
        }
        args = {
          ...args,
          studentId: student._id,
        };
      }
      return [
        ...await BookLog.find({ ...args, returnedDate: null }),
        ...await BookLog.find({ ...args, returnedDate: { $ne: null } }).sort({ returnedDate: -1 }),
      ];
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
    async borrowBook(_, { studentSerialNumber, bookSerialNumber: bsn }) {
      const db = await lowDb;
      const institutionAbb = await db.get('institutionAbb').value();
      const bookSerialNumber = bsn.replace(institutionAbb, '');
      const student = await Student.findOne({ serialNumber: studentSerialNumber, deleted: false });
      if (!student) {
        throw new UserInputError('Student not found.');
      }
      const book = await Book.findOne({ serialNumber: bookSerialNumber, deleted: false });
      if (!book) {
        throw new UserInputError('Book not found.');
      }
      const existingBookLog = await BookLog.findOne({
        bookId: book._id,
        returnedDate: null,
      });
      if (existingBookLog) {
        throw new UserInputError('Book already borrowed');
      }
      const noOfBooksBorrowed = await BookLog.count({
        studentId: student._id,
        returnedDate: null,
      });
      if (noOfBooksBorrowed >= await db.get('studentLimit').value()) {
        throw new UserInputError('The student cannot borrow more books');
      }
      const newBookLog = new BookLog({
        studentId: student._id,
        bookId: book._id,
        borrowedDate: new Date(),
        returnedDate: null,
        paidFine: null,
      });
      const res = await newBookLog.save();
      return {
        id: res._id,
        ...res._doc,
      };
    },
    async returnBook(_, { bookSerialNumber: bsn }) {
      const db = await lowDb;
      const institutionAbb = await db.get('institutionAbb').value();
      const bookSerialNumber = bsn.replace(institutionAbb, '');
      const book = await Book.findOne({ serialNumber: bookSerialNumber });
      if (!book) {
        throw new UserInputError('Book not found.');
      }
      const bookLog = await BookLog.findOne({ bookId: book._id, returnedDate: null });
      if (!bookLog) {
        throw new UserInputError('Book not borrowed');
      }
      const timeDiff = new Date().getTime() - new Date(bookLog.borrowedDate).getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      if (daysDiff > 15) {
        throw new UserInputError('Fine or renew book');
      }
      const res = await BookLog.findByIdAndUpdate(bookLog._id, {
        returnedDate: new Date(),
      }, { new: true });
      return {
        id: res._id,
        ...res._doc,
      };
    },
    // async renewBook(_, { bookLogId }) {
    //   const bookLog = await BookLog.findById(bookLogId);
    //   if (!bookLog) {
    //     throw new UserInputError('Booklog not found');
    //   }
    //   const timeDiff = new Date().getTime() - new Date(bookLog.borrowedDate).getTime();
    //   const daysDiff = timeDiff / (1000 * 3600 * 24);
    //   const db = await lowDb;
    //   const fineAfter = await db.get('fineAfter').value();
    //   if (daysDiff <= (fineAfter / 2)) {
    //     throw new UserInputError('No need to renew');
    //   } else if (daysDiff <= fineAfter) {
    //     const res = await BookLog.findByIdAndUpdate(bookLog._id, {
    //       renewed: true,
    //     });
    //     return !!res;
    //   } else {
    //     throw new UserInputError('Book cannot be renewd please fine book');
    //   }
    // },
    async payBookFine(_, { bookLogId }) {
      const bookLog = await BookLog.findById(bookLogId);
      if (!bookLog) {
        throw new UserInputError('Booklog not found');
      }
      const timeDiff = new Date().getTime() - new Date(bookLog.borrowedDate).getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      const db = await lowDb;
      if (daysDiff <= await db.get('fineAfter').value()) {
        throw new UserInputError('No need to fine');
      } else {
        const res = await BookLog.findByIdAndUpdate(bookLog._id, {
          paidFine: true,
          returnedDate: new Date(),
        }, { new: true });
        return {
          id: res._id,
          ...res._doc,
        };
      }
    },
    async quickBorrow(_, { studentSerialNumber, bookSerialNumber: bsn }) {
      const db = await lowDb;
      const institutionAbb = await db.get('institutionAbb').value();
      const bookSerialNumber = bsn.replace(institutionAbb, '');
      const student = await Student.findOne({ serialNumber: studentSerialNumber, deleted: false });
      if (!student) {
        throw new UserInputError('Student not found.');
      }
      const book = await Book.findOne({ serialNumber: bookSerialNumber, deleted: false });
      if (!book) {
        throw new UserInputError('Book not found.');
      }
      const existingBookLog = await BookLog.findOne({
        bookId: book._id,
        returnedDate: null,
      });
      if (!existingBookLog) {
        const noOfBooksBorrowed = await BookLog.count({
          studentId: student._id,
          returnedDate: null,
        });
        if (noOfBooksBorrowed >= await db.get('studentLimit').value()) {
          throw new UserInputError('The student cannot borrow more books');
        }
        const newBookLog = new BookLog({
          studentId: student._id,
          bookId: book._id,
          borrowedDate: new Date(),
          returnedDate: null,
          paidFine: null,
        });
        const res = await newBookLog.save();
        return {
          id: res._id,
          ...res._doc,
        };
      }
      const timeDiff = new Date().getTime() - new Date(existingBookLog.borrowedDate).getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      if (daysDiff > await db.get('fineAfter').value()) {
        throw new UserInputError('Fine book', {
          booklog: existingBookLog,
        });
      }
      const res = await BookLog.findByIdAndUpdate(existingBookLog._id, {
        returnedDate: new Date(),
      }, { new: true });
      return {
        id: res._id,
        ...res._doc,
      };
    },
  },
};

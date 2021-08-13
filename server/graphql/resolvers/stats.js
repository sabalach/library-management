const Student = require('../../db/Student');
const Book = require('../../db/Book');
const BookLog = require('../../db/BookLog');

module.exports = {
  Query: {
    async getStats() {
      const totalBooks = await Book.count({ deleted: { $ne: true } });
      const totalStudents = await Student.count({ deleted: { $ne: true } });
      const borrowedBooks = await BookLog.count({ returnedDate: null });
      return {
        totalBooks,
        totalStudents,
        borrowedBooks,
      };
    },
  },
};

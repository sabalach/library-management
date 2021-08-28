const Student = require('../../db/Student');
const Book = require('../../db/Book');
const BookLog = require('../../db/BookLog');

module.exports = {
  Query: {
    async getStats() {
      const totalBooks = await Book.count({ deleted: false });
      const oldBooks = await Book.count({ condition: 'OLD', deleted: false });
      const newBooks = await Book.count({ condition: 'NEW', deleted: false });
      const damagedBooks = await Book.count({ condition: 'DAMAGED', deleted: false });
      const lostBooks = await Book.count({ condition: 'LOST', deleted: false });
      const totalStudents = await Student.count({ deleted: false });
      const borrowedBooks = await BookLog.count({ returnedDate: null });
      return {
        totalBooks,
        totalStudents,
        borrowedBooks,
        newBooks,
        oldBooks,
        damagedBooks,
        lostBooks,
      };
    },
  },
};

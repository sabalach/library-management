const Student = require('../../db/Student');
const Book = require('../../db/Book');
const BookLog = require('../../db/BookLog');

module.exports = {
  Query: {
    async getStats() {
      const totalBooks = await Book.count({ deleted: false });
      const oldBooks = await Book.count({ condition: 'OLD' });
      const newBooks = await Book.count({ condition: 'NEW' });
      const damagedBooks = await Book.count({ condition: 'DAMAGED' });
      const lostBooks = await Book.count({ condition: 'LOST' });
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

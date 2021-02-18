const BookResolver = require('./book');

module.exports = {
  Query: {
    async hello() {
      return 'Hello World';
    },
    ...BookResolver.Query,
  },
  Mutation: {
    ...BookResolver.Mutation,
  },
};

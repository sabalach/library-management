// eslint-disable-next-line import/no-extraneous-dependencies
const { GraphQLScalarType } = require('graphql');
const BookResolver = require('./book');
const StudentResolver = require('./student');
const BookLogResolver = require('./booklog');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      return parseInt(ast.value, 10); // ast value is always in string format
    },
  }),
  Query: {
    async hello() {
      return 'Hello World';
    },
    ...BookResolver.Query,
    ...StudentResolver.Query,
    ...BookLogResolver.Query,
  },
  Mutation: {
    ...BookResolver.Mutation,
    ...StudentResolver.Mutation,
    ...BookLogResolver.Mutation,
  },
  BookLog: {
    ...BookLogResolver.BookLog,
  },
};

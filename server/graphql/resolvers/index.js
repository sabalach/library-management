// eslint-disable-next-line import/no-extraneous-dependencies
const { GraphQLScalarType } = require('graphql');
const {
  GraphQLUpload,
} = require('graphql-upload');
const BookResolver = require('./book');
const StudentResolver = require('./student');
const BookLogResolver = require('./booklog');
const LevelResolver = require('./level');
const DepartmentResolver = require('./department');
const LogoResolver = require('./logo');
const ConfigResolver = require('./config');
const StatsResolver = require('./stats');
const LoginResolver = require('./login');

module.exports = {
  Upload: GraphQLUpload,
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
    ...LevelResolver.Query,
    ...DepartmentResolver.Query,
    ...ConfigResolver.Query,
    ...StatsResolver.Query,
  },
  Mutation: {
    ...BookResolver.Mutation,
    ...StudentResolver.Mutation,
    ...BookLogResolver.Mutation,
    ...LevelResolver.Mutation,
    ...DepartmentResolver.Mutation,
    ...LogoResolver.Mutation,
    ...ConfigResolver.Mutation,
    ...LoginResolver.Mutation,
  },
  Student: {
    ...StudentResolver.Student,
  },
  BookLog: {
    ...BookLogResolver.BookLog,
  },
};

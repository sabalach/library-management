const { UserInputError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const lowDb = require('../../lowDb');

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const db = await lowDb;
      if (await db.get(`admins.${username}`).value() !== password) {
        throw new UserInputError('Incorrect username or password');
      }
      const token = await jwt.sign({ username }, await db.get('TOKEN_KEY').value(), {
        expiresIn: '5 days',
      });
      if (!token) {
        throw new UserInputError('Token generation failed');
      }
      return token;
    },
  },
};

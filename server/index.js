const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { readFileSync } = require('fs');
const next = require('next');
const resolvers = require('./graphql/resolvers');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const typeDefs = readFileSync(`${__dirname}/graphql/schema.graphql`, { encoding: 'utf8', flag: 'r' });

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

nextApp.prepare().then(() => {
  app.use((req, res) => {
    handle(req, res);
  });
});

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));

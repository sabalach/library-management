const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const { readFileSync } = require('fs');
const next = require('next');
const mongoose = require('mongoose');
const resolvers = require('./graphql/resolvers');
const { startDB, models } = require('./db');

(async () => {
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev });
  const handle = nextApp.getRequestHandler();

  const typeDefs = readFileSync(`${__dirname}/graphql/schema.graphql`, { encoding: 'utf8', flag: 'r' });

  const { db, gfs } = await startDB({
    // user: 'graphql',
    // pwd: 'yoga123',
    db: 'library-mgmt',
    url: 'localhost:27017',
  });

  const context = {
    models,
    db,
  };

  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    uploads: false,
  });

  app.use(graphqlUploadExpress());

  app.get('/img/:id', async (req, res) => {
    gfs.exist({ _id: `${req.params.id}` }, (err, found) => {
      if (err) throw new Error(err);
      if (found) {
        const readstream = gfs.createReadStream({
          _id: mongoose.Types.ObjectId(req.params.id),
        });
        readstream.pipe(res);
      } else {
        res.send('File not found');
      }
    });
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));

  await nextApp.prepare();

  app.use((req, res) => {
    handle(req, res);
  });
})();

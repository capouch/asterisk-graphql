import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import * as bodyParser from 'body-parser';
import schema from './data/schema'
import resolvers from './data/resolvers.js'

import Mocks from './data/mocks';

const GRAPHQL_PORT = 8080;

const graphQLServer = express();

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

//addMockFunctionsToSchema({
//  schema: executableSchema,
//  mocks: Mocks,
//  preserveResolvers: true,
//});

graphQLServer.use(bodyParser.urlencoded({ extended: true }));
graphQLServer.use(bodyParser.json());

graphQLServer.use('/graphql', graphqlExpress(() => {
  return {
    schema: executableSchema,
    context: { },
  };
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));

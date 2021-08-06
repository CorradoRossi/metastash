import { ApolloServer } from 'apollo-server-micro';

import createMesh from '../../lib/mesh/createMesh';

const createApolloServer = async () => {
  const { schema, contextBuilder } = await createMesh();
  const apolloServer = new ApolloServer({
    schema,
    context: contextBuilder,
    introspection: true,
    playground: true
  });
  return apolloServer;
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req: any, res: any) => {
  const apolloServer = await createApolloServer();
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};

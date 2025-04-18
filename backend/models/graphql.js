const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const createGraphQLServer = async (app) => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start(); // 确保 Apollo Server 已启动
  
  app.use("/graphql", expressMiddleware(server)); // 挂载 GraphQL 到 Express
};

module.exports = createGraphQLServer;

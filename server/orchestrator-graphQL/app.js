const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const PORT = process.env.PORT || 4000;
const {
  typeDefs: productTypeDefs,
  resolvers: productResolvers,
} = require("./schemas/product");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

(async () => {
  const server = new ApolloServer({
    typeDefs: [productTypeDefs, userTypeDefs],
    resolvers: [productResolvers, userResolvers],
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();

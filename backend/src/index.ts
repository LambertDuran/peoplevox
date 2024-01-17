import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import resolvers from "./resolver";
import cache from "./cache";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    cache, // Pass the cache instance to the context
  }),
});

await startStandaloneServer(server, { listen: { port: 4000 } });

console.log("Server ready at port", 4000);

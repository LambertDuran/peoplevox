import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";

const users = [
  {
    id: "1",
    email: "lambert.drn@gmail.com",
    password:"test123",
    name: "Lambert",
    surname: "Duran",
  },
  {
    id: "2",
    email: "charley.drn@gmail.com",
    name: "Charley",
    password: "test12345",
    surname: "Duran",
  },
];

const resolvers = {
  Query: {
    users() {
      return users;
    },
    user(_, args){
      return users.find( (u) => u.id === args.id );
    }
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log("Server ready at port", 4000);
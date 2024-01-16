import { ApolloServer } from "@apollo/server";
import { describe, it } from "@jest/globals";
import { typeDefs } from "../src/schema";
import resolvers from "../src/resolver";

describe("MUTATIONS / addUser", () => {
  it("should create a new user", async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const response = await server.executeOperation({
      query: `
        mutation AddUser($user: AddUserInput!) {
          addUser(user: $user) {
            id
            email
            password
            name
            surname
          }
        }
      `,
      variables: {
        surname: "Duran",
        name: "Lambert",
        email: "lambert.drn@gmail.com",
        password: "abc123AZ%",
      },
    });

    console.log("response", response);
  });
});

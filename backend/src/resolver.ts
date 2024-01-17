import cache from "./cache";
import { GraphQLError } from "graphql";

interface IUser {
  surname: string;
  name: string;
  email: string;
  password: string;
  id?: string;
}

const resolvers = {
  Query: {
    users() {
      const cachedUsers = cache.values();
      return cachedUsers;
    },
    user(_, args) {
      const cachedUser = cache.get(`${args.id}`);
      return cachedUser;
    },
    auth(_, args) {
      const cachedUser = cache.find((u) => {
        return (
          "email" in u &&
          "password" in u &&
          u.email === args.email &&
          u.password === args.password
        );
      });
      return cachedUser;
    },
  },
  Mutation: {
    addUser(_, args) {
      // Check there is a surname
      if (!args.user.surname) {
        throw new GraphQLError("Surname must be set", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Check there is a name
      if (!args.user.name) {
        throw new GraphQLError("Name must be set", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Check there is a email
      if (!args.user.email) {
        throw new GraphQLError("Email must be set", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Check there is a Password
      if (!args.user.password) {
        throw new GraphQLError("Password must be set", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Check the user doen't already exist
      const alreadyExistingUser = cache.find((u) => {
        return "email" in u && u.email === args.user.email;
      });
      if (alreadyExistingUser) {
        throw new GraphQLError("Email not available", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // Create a new id
      const lastUser = cache.values().next().value as IUser | null;
      let id = 1;
      if (lastUser && "id" in lastUser) id = parseInt(lastUser.id) + 1;

      let user = {
        ...args.user,
        id,
      };

      // Record the new user
      cache.set(`${user.id}`, user);

      return user;
    },
  },
};

export default resolvers;

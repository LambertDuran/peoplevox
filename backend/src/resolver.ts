import cache from "./cache";

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
  },
  Mutation: {
    addUser(_, args) {
      // Check there is a surname
      if (!args.user.surname) {
        console.log("A user must have a surname");
        return null;
      }

      // Check there is a name
      if (!args.user.name) {
        console.log("A user must have a name");
        return null;
      }

      // Check the user doen't already exist
      const alreadyExistingUser = cache.find((u) => {
        return u.email === args.user.email;
      });
      if (alreadyExistingUser) {
        console.log("A user with this email is already existing");
        return null;
      }

      // Create a new id
      const users = cache.values().next();
      let id = 1;
      if (users.value) id = parseInt(users.value.id) + 1;

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

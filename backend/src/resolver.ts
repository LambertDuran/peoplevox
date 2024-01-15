const users = [
  {
    id: "1",
    email: "lambert.drn@gmail.com",
    password: "test123",
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
    user(_, args) {
      return users.find((u) => u.id === args.id);
    },
  },
  Mutation: {
    addUser(_, args) {
      let user = {
        ...args.user,
        id: Math.floor(Math.random() * 1000).toString(),
      };

      users.push(user);

      return user;
    },
  },
};

export default resolvers;

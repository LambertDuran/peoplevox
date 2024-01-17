import { ApolloServer } from "@apollo/server";
import { describe, it, expect } from "@jest/globals";
import { typeDefs } from "../src/schema";
import resolvers from "../src/resolver";

let user = {
  surname: "Duran",
  name: "Lambert",
  email: "lambert.drn@gmail.com",
  password: "abc123AZ%",
};

const ADD_USER = `
mutation AddUser($user: AddUserInput!) {
  addUser(user: $user) {
    id
    email
    password
    name
    surname
  }
}
`;

const AUTH_USER = `
query Auth($email: String!, $password: String!) {
  auth(email: $email, password: $password) {
    id
    email
    name
    surname
  }
}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

describe("MUTATIONS / addUser", () => {
  it("shouldn't be a user without name", async () => {
    const response = await server.executeOperation({
      query: ADD_USER,
      variables: {
        user: { ...user, name: "" },
      },
    });

    expect(response.body.kind).toBe("single");
    expect((response.body as any).singleResult.data.addUser).toBe(null);
    expect((response.body as any).singleResult.errors[0].message).toBe(
      "Name must be set"
    );
  });

  it("shouldn't be a user without surname", async () => {
    const response = await server.executeOperation({
      query: ADD_USER,
      variables: {
        user: { ...user, surname: "" },
      },
    });

    expect(response.body.kind).toBe("single");
    expect((response.body as any).singleResult.data.addUser).toBe(null);
    expect((response.body as any).singleResult.errors[0].message).toBe(
      "Surname must be set"
    );
  });

  it("shouldn't be a user without email", async () => {
    const response = await server.executeOperation({
      query: ADD_USER,
      variables: {
        user: { ...user, email: "" },
      },
    });

    expect(response.body.kind).toBe("single");
    expect((response.body as any).singleResult.data.addUser).toBe(null);
    expect((response.body as any).singleResult.errors[0].message).toBe(
      "Email must be set"
    );
  });

  it("shouldn't be a user without password", async () => {
    const response = await server.executeOperation({
      query: ADD_USER,
      variables: {
        user: { ...user, password: "" },
      },
    });

    expect(response.body.kind).toBe("single");
    expect((response.body as any).singleResult.data.addUser).toBe(null);
    expect((response.body as any).singleResult.errors[0].message).toBe(
      "Password must be set"
    );
  });

  it("should create a new user", async () => {
    const response = await server.executeOperation({
      query: ADD_USER,
      variables: {
        user: user,
      },
    });

    expect(response.body.kind).toBe("single");
    expect((response.body as any).singleResult.errors).toBeUndefined();
    expect((response.body as any).singleResult.data.addUser).toEqual({
      ...user,
      id: "1",
    });
  });

  it("should warn the email is not available", async () => {
    const response = await server.executeOperation({
      query: ADD_USER,
      variables: {
        user: user,
      },
    });

    expect(response.body.kind).toBe("single");
    expect((response.body as any).singleResult.errors[0].message).toBe(
      "Email not available"
    );
  });
});

describe("QUERY / auth", () => {
  it("should verify the user is in the database", async () => {
    const response = await server.executeOperation({
      query: AUTH_USER,
      variables: {
        email: user.email,
        password: user.password,
      },
    });

    expect(response.body.kind).toBe("single");
    expect((response.body as any).singleResult.errors).toBeUndefined();
    expect((response.body as any).singleResult.data.auth).toEqual({
      id: "1",
      email: "lambert.drn@gmail.com",
      name: "Lambert",
      surname: "Duran",
    });
  });
});

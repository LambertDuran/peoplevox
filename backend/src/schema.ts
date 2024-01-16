export const typeDefs = `#graphql
    type User{
        id: ID!
        email: String!
        password: String!
        name: String!
        surname: String!
    }
    type Query{
        users: [User]
        user(id: ID!): User
        auth(email: String!, password: String!) : User
    }
    type Mutation {
        addUser(user: AddUserInput!): User
    }
    input AddUserInput{
        email: String!
        password: String!
        name: String!
        surname: String!
    }
`;

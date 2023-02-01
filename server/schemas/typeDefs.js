const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Workout {
    bodyPart: String
    equipment: String
    gifUrl: String
    workoutId: String
    name: String
    target: String
  }

  input workout {
    bodyPart: String
    equipment: String
    gifUrl: String
    workoutId: String
    name: String
    target: String
  }

  type User {
    _id: ID
    username: String
    email: String
    workouts: [Workout]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    saveWorkout(input: workout!): User
    removeWorkout(workoutId: ID!): User
  }
`;

module.exports = typeDefs;

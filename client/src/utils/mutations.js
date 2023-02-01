import { gql } from "@apollo/client";

export const login = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const signup = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const add_workout = gql`
  mutation Mutation($input: workout!) {
    saveWorkout(input: $input) {
      _id
      username
      email
      workouts {
        bodyPart
        equipment
        gifUrl
        workoutId
        name
        target
      }
    }
  }
`;

export const remove_workout = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        workouts {
          bodyPart
          equipment
          gifUrl
          workoutId
          name
          target
        }
      }
    }
  }
`;

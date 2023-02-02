import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_WORKOUT = gql`
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

export const REMOVE_WORKOUT = gql`
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

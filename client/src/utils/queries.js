import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query {
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
`;

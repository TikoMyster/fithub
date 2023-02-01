import { gql } from "@apollo/client";

export const get_user = gql`
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

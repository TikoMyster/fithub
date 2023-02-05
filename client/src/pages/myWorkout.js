import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";
import WorkoutCard from "../components/Card";

export default function MyWorkouts() {
  const { loading, data } = useQuery(GET_USER);
  const userData = data?.user;

  return (
    <>
      {Auth.loggedIn() ? (
        <div className="container-fluid backgroundMyWorkouts ">
          <h1 className="mt-5 text-center pagetext">My Workout</h1>
          <div className="mt-5 row d-flex justify-content-center">
            {userData?.workouts.length ? (
              userData?.workouts.map((workout) => (
                <WorkoutCard
                  key={workout.workoutId}
                  name={workout.name}
                  bodyPart={workout.bodyPart}
                  equipment={workout.equipment}
                  gifUrl={workout.gifUrl}
                  workoutId={workout.workoutId}
                  target={workout.target}
                  add={true}
                />
              ))
            ) : (
              <h2 className="mt-5 text-center pagetext">No saved workout!blabla</h2>
            )}
          </div>
        </div>
      ) : (
        <h1 className="mt-5 text-center pagetext">You need to login!</h1>
      )}
    </>
  );
}

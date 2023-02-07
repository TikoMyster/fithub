import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";
import WorkoutCard from "../components/Card";
import BasicModal from "../components/Modal";

export default function MyWorkouts() {
  const { loading, data } = useQuery(GET_USER);
  const userData = data?.user;

  return (
    <div
      style={{
        height: "90vh",
        backgroundImage: "url(/assets/bg-search.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "scroll",
      }}
    >
      {Auth.loggedIn() ? (
        <div className="container-fluid ">
          <BasicModal />
          <h1 className="text-center text-white">My Workouts</h1>
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
              <h2 className="mt-5 text-center text-white">No saved workout</h2>
            )}
          </div>
        </div>
      ) : (
        <h1 className="mt-5 text-center text-white">You need to login!</h1>
      )}
    </div>
  );
}

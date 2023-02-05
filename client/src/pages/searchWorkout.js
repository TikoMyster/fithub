import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { searchExerciseDB } from "../utils/Api";
import Auth from "../utils/auth";
import { idbPromise } from "../utils/helpers";
import WorkoutCard from "../components/Card";
import SearchInput from "../components/Select";

export default function SearchWorkouts() {
  // declare state to store the api response
  const [workouts, setWorkouts] = useState([]);
  //get user saved workout data
  const { loading, data } = useQuery(GET_USER);
  const userData = data?.user;
  const savedWorkouts = userData?.workouts;

  const handleSearch = async (bodypart) => {
    try {
      // if api response was saved in indexedDB, no need to do api calls
      const workout = await idbPromise(bodypart, "get");
      if (workout.length) {
        console.log("========retrieving data from idb========");
        setWorkouts(workout);
        return;
      } else {
        const response = await searchExerciseDB(bodypart);
        console.log("========making an api call to exerciseDB========");
        if (response.ok) {
          const jsonResponse = await response.json();
          setWorkouts(jsonResponse);
          jsonResponse.forEach((workout) => {
            idbPromise(bodypart, "put", workout);
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="mt-5 text-center pagetext">Search For Workouts!</h1>
      {!Auth.loggedIn() && (
        <h4 className="mt-3 text-center pagetext">Login to save workouts</h4>
      )}
      <SearchInput handleSearch={handleSearch} />
      <div className="container-fluid backgroundSearch">
        <div className="mt-5 row d-flex justify-content-center">
          {workouts.length ? (
            workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                name={workout.name}
                bodyPart={workout.bodyPart}
                equipment={workout.equipment}
                gifUrl={workout.gifUrl}
                workoutId={workout.id}
                target={workout.target}
                savedWorkouts={savedWorkouts}
              />
            ))
          ) : (
            <h2 className="mt-5 text-center pagetext">Get started now!</h2>
          )}
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { searchExerciseDB } from "../utils/Api";
import WorkoutCard from "../components/Card";
import SearchInput from "../components/Select";
import { idbPromise } from "../utils/helpers";

export default function SearchWorkouts() {
  // declare state to store the api response
  const [workouts, setWorkouts] = useState([]);
  const handleSearch = async (bodypart) => {
    try {
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
      <h1 className="mt-5 text-center">Search For Workouts!</h1>
      <SearchInput handleSearch={handleSearch} />
      <div className="container-fluid ">
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
              />
            ))
          ) : (
            <h2 className="mt-5 text-center">Get started now !blabla</h2>
          )}
        </div>
      </div>
    </>
  );
}

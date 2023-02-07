import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { SAVE_WORKOUT, REMOVE_WORKOUT } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import { searchById } from "../utils/Api";
import { idbPromise } from "../utils/helpers";
import Auth from "../utils/auth";
import Button from "@mui/joy/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const style = {
  textShadow: "10px 10px 10px #000",
  color: "#fff",
};

export default function Detail() {
  const navigate = useNavigate();
  let { workoutId } = useParams();
  const [workoutToDisplay, setWorkoutToDisplay] = useState({});
  const { loading, data } = useQuery(GET_USER);
  const userData = data?.user;
  const savedWorkouts = userData?.workouts;
  const add = savedWorkouts?.some((workout) => workout.workoutId === workoutId);
  useEffect(() => {
    async function getWorkoutDetail() {
      try {
        const workout = await idbPromise("detail", "getOne", workoutId);
        if (!workout) {
          console.log("========making an api call to exerciseDB========");
          const response = await searchById(workoutId);
          const jsonResponse = await response.json();
          idbPromise("detail", "add", jsonResponse);
          setWorkoutToDisplay(jsonResponse);
        } else {
          console.log("========retrieving data from idb========");
          setWorkoutToDisplay(workout);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getWorkoutDetail();
  }, []);

  // handle add workout and remove workout
  const [saveWorkout] = useMutation(SAVE_WORKOUT);
  const handleAddWorkout = async (workoutToSave) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      // save to mongodb
      await saveWorkout({ variables: { input: workoutToSave } });
      idbPromise("myworkout", "add", workoutToSave);
    } catch (err) {
      console.log(err);
    }
  };

  const [deleteWorkout] = useMutation(REMOVE_WORKOUT);
  const handleRemoveWorkout = async (workoutId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      // save to mongodb
      await deleteWorkout({ variables: { workoutId } });
      idbPromise("myworkout", "delete", workoutId);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="container-fluid "
      style={{
        height: "90vh",
        backgroundImage: "url(/assets/bg-search.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "scroll",
      }}
    >
      <Button
        style={{ marginTop: "1rem", color: "#000", backgroundColor: "#CEFF00" }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </Button>
      <div className="row mt-2 d-flex align-items-center justify-content-center ">
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <img
            alt={workoutToDisplay.name}
            src={workoutToDisplay.gifUrl}
            style={{ width: "80%", borderRadius: 15 }}
          />
        </div>
        <div
          className="col-12 col-md-6 text-white "
          style={{ fontSize: "1.5rem" }}
        >
          <h1
            style={{
              fontWeight: 600,
              textShadow: "10px 10px 10px #000",
              color: "#fff",
            }}
          >
            {workoutToDisplay.name}
          </h1>
          <p style={style}>Equipment: {workoutToDisplay.equipment}</p>
          <p style={style}>Body part: {workoutToDisplay.bodyPart}</p>
          <p style={style}>Target: {workoutToDisplay.target}</p>
          {Auth.loggedIn() ? (
            <>
              {add && (
                <Button
                  style={{ color: "#000", backgroundColor: "#CEFF00" }}
                  onClick={() => handleRemoveWorkout(workoutToDisplay.id)}
                >
                  <FavoriteOutlinedIcon color="danger" />
                  Already added
                </Button>
              )}
              {!add && (
                <Button
                  style={{ color: "#000", backgroundColor: "#CEFF00" }}
                  onClick={() =>
                    handleAddWorkout({
                      name: workoutToDisplay.name,
                      bodyPart: workoutToDisplay.bodyPart,
                      equipment: workoutToDisplay.equipment,
                      gifUrl: workoutToDisplay.gifUrl,
                      workoutId: workoutToDisplay.id,
                      target: workoutToDisplay.target,
                    })
                  }
                >
                  <FavoriteBorderOutlinedIcon color="danger" />
                  Add to my workout
                </Button>
              )}
            </>
          ) : (
            <Button
              style={{ color: "#000", backgroundColor: "#CEFF00" }}
              onClick={() => {
                window.location.assign("/login");
              }}
            >
              Login to save workouts
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

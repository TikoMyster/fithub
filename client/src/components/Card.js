import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { SAVE_WORKOUT, REMOVE_WORKOUT } from "../utils/mutations";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMyWorkout,
  addWorkout,
  removeWorkout,
} from "../features/addWorkoutSlice";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { idbPromise } from "../utils/helpers";

export default function WorkoutCard({
  name,
  bodyPart,
  equipment,
  gifUrl,
  workoutId,
  target,
}) {
  // select myworkout state from store obj
  const myWorkout = useSelector(selectMyWorkout);
  const dispatch = useDispatch();
  // graphql mutation to save to mongodb
  const [saveWorkout] = useMutation(SAVE_WORKOUT);

  // handle add workout
  const handleAddWorkout = async (workoutToSave) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      // save to mongodb
      await saveWorkout({ variables: { input: workoutToSave } });
      // update the state
      dispatch(addWorkout(workoutToSave));
      // save to idb
      idbPromise("myworkout", "add", workoutToSave);
    } catch (err) {
      console.log(err);
    }
  };

  // remove the workout by id
  const [deleteWorkout] = useMutation(REMOVE_WORKOUT);
  const handleRemoveWorkout = async (workoutId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      // save to mongodb
      await deleteWorkout({ variables: { workoutId } });
      // update the state
      dispatch(removeWorkout(workoutId));
      // save to idb
      idbPromise("myworkout", "delete", workoutId);
    } catch (err) {
      console.log(err);
    }
  };

  // persist the saved workout data
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const { loading, data } = useQuery(GET_USER);

  useEffect(() => {
    // keep the question mark
    const userData = data?.user;
    setSavedWorkouts(userData?.workouts);
  }, [myWorkout, data, dispatch]);

  return (
    <Card
      variant="outlined"
      className="col-12 col-md-4 col-lg-3"
      style={{ margin: "1rem" }}
    >
      <Typography level="h2" fontSize="lg" sx={{ mb: 1 }}>
        {name}
      </Typography>
      <Typography level="body2">
        <Button variant="soft">{target}</Button>
      </Typography>
      {Auth.loggedIn() && (
        <IconButton
          onClick={() => {
            const add = savedWorkouts?.some(
              (workout) => workout.workoutId === workoutId
            );
            if (add) {
              handleRemoveWorkout(workoutId);
            } else {
              handleAddWorkout({
                name,
                bodyPart,
                equipment,
                gifUrl,
                workoutId,
                target,
              });
            }
          }}
          variant={
            savedWorkouts?.some((workout) => workout.workoutId === workoutId)
              ? "soft"
              : "plain"
          }
          aria-label="bookmark Bahamas Islands"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          <FavoriteBorderRoundedIcon color="danger" />
        </IconButton>
      )}

      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img src={gifUrl} loading="lazy" alt={name} />
      </AspectRatio>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          <Link
            to={`/workout/detail/${workoutId}`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            {" "}
            Detail
          </Link>
        </Button>
      </Box>
    </Card>
  );
}

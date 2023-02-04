//==============this component is being used in two pages:  searchWorkout.js and myWorkout.js==============
import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SAVE_WORKOUT, REMOVE_WORKOUT } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

import Auth from "../utils/auth";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

export default function WorkoutCard({
  name,
  bodyPart,
  equipment,
  gifUrl,
  workoutId,
  target,
  savedWorkouts,
  add,
}) {
  // =======note: the store obj isn't used here. It will be further implemented in futher development=======
  // select myworkout state from store obj
  // const myWorkout = useSelector(selectMyWorkout);
  // const dispatch = useDispatch();
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
      // dispatch(addWorkout(workoutToSave));
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
      // dispatch(removeWorkout(workoutId));
      // save to idb
      idbPromise("myworkout", "delete", workoutId);
    } catch (err) {
      console.log(err);
    }
  };

  // myworkout page passes a prop add to this Component, when this component is rended in myworkout page, set added to always be true,
  // so the 'like' icon only needs to handle remove workout function; otherwise, it's in search workout page, for each card, it runs
  // .some() method to check whether it's selected

  const added =
    add || savedWorkouts?.some((workout) => workout.workoutId === workoutId);

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
          // if the card is selected, added is true, click event will trigger handleRemoveWorkout function
          onClick={() => {
            if (added) {
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
          variant="plain"
          aria-label="bookmark Bahamas Islands"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          {added ? (
            <FavoriteOutlinedIcon color="danger" />
          ) : (
            <FavoriteBorderOutlinedIcon color="danger" />
          )}
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
            // link to the detail page
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

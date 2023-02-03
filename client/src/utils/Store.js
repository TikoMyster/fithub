import { configureStore } from "@reduxjs/toolkit";
import myWorkoutReducer from "../features/addWorkoutSlice";

export default configureStore({
  reducer: {
    myWorkout: myWorkoutReducer,
  },
});

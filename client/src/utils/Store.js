//this file is currently not being used, but save it for future development
import { configureStore } from "@reduxjs/toolkit";
import myWorkoutReducer from "../features/addWorkoutSlice";

export default configureStore({
  reducer: {
    myWorkout: myWorkoutReducer,
  },
});

//==============this file is currently not being used, but keep it for future development==============
import { createSlice } from "@reduxjs/toolkit";

export const myWorkoutSlice = createSlice({
  name: "myWorkout",
  initialState: [],
  reducers: {
    addWorkout: (state, action) => {
      state.push(action.payload);
    },
    removeWorkout: (state, action) => {
      return state.filter((workout) => workout.id !== action.payload.id);
    },
  },
});

export const selectMyWorkout = (state) => state.myWorkout;

export const { addWorkout, removeWorkout } = myWorkoutSlice.actions;
export default myWorkoutSlice.reducer;

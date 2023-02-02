const mongoose = require("mongoose");

const { Schema } = mongoose;

const workoutSchema = new Schema({
  bodyPart: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
  },
  gifUrl: {
    type: String,
  },
  workoutId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  target: {
    type: String,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

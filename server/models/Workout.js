const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutSchema = new Schema({
  bodyPart: {
    type: String,
    required: true,
    trim: true
  },
  equipment: {
    type: String
  },
  gifUrl: {
    type: String
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String
  },
  target: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;

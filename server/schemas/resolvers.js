const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user._id) {
        return await User.findById(context.user._id).populate("workouts");
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    signup: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveWorkout: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workouts: args.input } },
          {
            new: true,
          }
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    removeWorkout: async (parent, { workoutId }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { workouts: { workoutId } } },
          { new: true }
        );
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;

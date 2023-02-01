const db = require("./connection");
const { User, Workout, Category } = require("../models");

db.once("open", async () => {
  await Workout.deleteMany();

  const products = await Workout.insertMany([
    {
      bodyPart: "waist",
      equipment: "body weight",
      gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
      workoutId: "0001",
      name: "3/4 sit-up",
      target: "abs",
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    username: "test",
    email: "test@test.com",
    password: "111111",
  });

  console.log("users seeded");

  process.exit();
});

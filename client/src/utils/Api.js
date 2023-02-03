export const searchExerciseDB = async (bodypart) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  return await fetch(
    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}`,
    options
  );
};

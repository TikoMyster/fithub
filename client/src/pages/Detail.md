## Detail page

The detail page needs to be implemented. The main functionality is that user should be able to see the workout title,
bodypart, gif and etc.

## How to implement:

Overview:

check if the workout is saved in `idb detail` object first. If the workout is saved, pull from idb,
otherwise, make an api call to the ExerciseDb, and save the data to the `detail` object in idb. Then process the workout data.

### make api calls

based on bodypart: `searchExerciseDB(bodypart)` in `client/src/utils/Api.js`

However, in the detail page, this function isn't gonna work. Here we're querying the db based on workout id.

**WE NEED TO:**

1. Get the id from the url query parameter using the `useParams()` hook.
1. Write a function that queries the ExerciseDB by the id we get from the url.
1. After making the api request, save the response to idb.
1. Display the card based on the response.

### - Display the like button

If a user has liked the workout from searchWorkout page, in detail page, the like button should show pressed.

**WE NEED TO:**

1. Query the user and get the workout data, check if the workout with the id exisis in the db.
1. if yes, the initial state of the button should be `pressed` and onclick event should `handleRemoveWorkout` ;
1. if not, the initial state of the button should be not pressed, and the onclick event should `handleAddWorkout`

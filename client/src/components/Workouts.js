import React, { useEffect, useState } from 'react';
import Pagination from '@mui/joy/Pagination';
import { Box, Stack, Typography } from '@mui/joy';

import { excerciseOptions, fetchData } from '../utils/fetchData';
import WorkoutCard from './WorkoutCard'

const Workouts = ( { workouts, setExcercises, bodyPart }) => {
console.log(workouts);

const [currentPage, setCurrentPage] = useState(1);
const workoutsPerPage = 9;

const indexofLastWorkout = currentPage * workoutsPerPage;

const indexofFirstWorkout = indexofLastWorkout - workoutsPerPage;
const currentWorkouts = workouts.slice (indexofFirstWorkout, indexofLastWorkout); 

const paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth'})
}

useEffect( ( ) => {
    const fetchWorkoutData = async () => {
        let workoutData = [ ];

        if (bodyPart === 'all' ) {
            workoutData = await fetchData ( 'https://excercisedb.p.rapidapi.com/excercises', excerciseOptions);
        } else {
            workoutData = await fetchData ( `https://excercisedb.p.rapidapi.com/bodyPart/${bodyPart}`, excerciseOptions);
        }
        setExcercises(workoutData);
    }

    fetchWorkoutData();
}, [bodyPart]);
    
  return (
    <Box id="workouts"
        sx={{mt: { lg: '110px' }}}
        mt= "50px"
        p="20px"
    >
        <Typography variant="h3" mb="46px">
        Workouts
        </Typography>
        <Stack direction="row" sx={{gap: { lg: '110px', xs: '50px' }}} flexWrap="wrap" justifyContent="center">
            {currentWorkouts.map((workouts, index) =>
                <WorkoutCard key={index} workouts={workouts} />
            )}

        </Stack>
        <Stack mt="100px" alignItems="center">
            {workouts.length > 9 && (
                <Pagination 
                    color="standard"
                    shape="rounded"
                    defaultPage={1}
                    count={Math.ceil(workouts.lenth / workoutsPerPage)}
                    page={currentPage}
                    onChange={paginate}
                    size="large"
                />
            )}

        </Stack>
        </Box>
  )
}

export default Workouts
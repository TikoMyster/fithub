import React, {useEffect, useState } from 'react' ;
import { useParams } from 'react-router-dom';
import { Box } from '@mui/joy';

import { workoutOptions, fetchData } from '../utils/fetchData';
import Detail from '../components/Detail';
// import ExcerciseVideos from '../components/ExcerciseVideos';
// import SimilarWorkouts from '../components/SimilarWorkouts';

const WorkoutDetail = () => {
  const [ WorkoutDetail, setWorkoutDetail ] = useState( { } );
  const { id } = useParams();

  useEffect(( ) => { 
    const fetchWorkoutData = async () => {
      const excercisedbURL = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const WorkoutDetailData = await fetchData(`${excercisedbURL}/excercises/excercise/${id}`, workoutOptions);
      setWorkoutDetail(WorkoutDetailData);

    }

    fetchWorkoutData();
  }, [id]);

  return (
    <Box>
      <Detail WorkoutDetail={WorkoutDetail} />
      
    </Box>

  )
}

export default WorkoutDetail

import { getExercises } from "../../api/exercise";
import { useEffect, useState } from "react";
import ImpairmentListItem from "../impairments/impairmentListItem";
import { Card, Stack, Grid } from '@mui/material';

const ExerciseList = () => {

  const [exercises, setExercises] = useState([])
  useEffect( () => {
    const callApiForExercises = async() => {
      const data = await getExercises() 
      setExercises(data[1])
    }
    callApiForExercises()
  }, [])
  
  const [selected, setSelected] = useState(null);

  return <>
    <Grid container  spacing={2}>
      {exercises.map((exercise, index) => (
        <Grid margin={3} key={index} xs={3}>
          <Card >
            <Stack margin={2} onClick={() => setSelected(index)} height="140">
              <img alt="" src={exercise.imageLink} height="150"></img>
              <p>{exercise.name}</p>
              <p>Target Muscle Group: {exercise.targetMuscleGroup}</p>
            </Stack>
            <Stack margin={2}>
              { selected === index &&
                <div>
                  <p>{exercise.description}</p>
                  { exercise.impairments.length > 0 && 
                    <p>This exercise could generally also be practised by people with the following impairments:</p>
                  }
                  <ul>{exercise.impairments.map((impairment, index) => (
                    <ImpairmentListItem key={index} impairmentURL={impairment}/> 
                  ))}</ul>
                  { exercise.videoLink !== "" && 
                    <a href={exercise.videoLink}>Click here for video!</a>
                  }
                </div>
              }
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>      
  </> 
}

export default ExerciseList;
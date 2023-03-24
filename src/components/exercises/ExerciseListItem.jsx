import { getExercises } from "../../api/exercise";
import { useEffect, useState } from "react";
import ImpairmentListItem from "../impairments/ImpairmentListItem";
import { Card, Stack, Grid, Button } from '@mui/material';

const ExerciseListItem = ({exercise, index, selected, setSelected}) => {

  return <>
        <Grid item={true} margin={3} key={index} xs={3}>
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
                    <Button href={exercise.videoLink} sx={{ border:1, borderRadius:"16px" }}>Video</Button>
                  }
                </div>
              }
            </Stack>
          </Card>
        </Grid>  
    </> 
}

export default ExerciseListItem;
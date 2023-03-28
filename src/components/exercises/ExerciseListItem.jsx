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
                    <p>This exercise should be avoided by people with the following impairments:</p>
                  }
                  {exercise.impairments.map((impairment, index) => (
                    <ImpairmentListItem key={index} impairmentURL={impairment}/> 
                  ))}
                  { exercise.videoLink !== "" && 
                    <Button href={exercise.videoLink} sx={{
                      background: "#2196f3",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1769aa",
                      },
                    }}>Video</Button>
                  }
                </div>
              }
            </Stack>
          </Card>
        </Grid>  
    </> 
}

export default ExerciseListItem;
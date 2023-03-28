import { getExercises } from "../../api/exercise";
import { useEffect, useState } from "react";
import ImpairmentListItem from "../impairments/ImpairmentListItem";
import { Card, Stack, Grid } from '@mui/material';
import ExerciseListItem from "./ExerciseListItem";

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
    <Grid container spacing={2}>
      {exercises.map((exercise, index) => (
        <ExerciseListItem key={index} exercise={exercise} index={index} selected={selected} setSelected={setSelected}/> 
      ))}
    </Grid>      
  </> 
}

export default ExerciseList;
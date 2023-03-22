import { useEffect, useState } from "react";
import {ListItemIcon, ListItemButton, ListItemText, CircularProgress} from "@mui/material"
import { SportsFootball } from "@mui/icons-material"
import { getWorkoutByUrl } from "../../../api/workout";
import { getExerciseByUrl } from "../../../api/exercise";

const WorkoutListItem = ({exerciseUrl /*,index, updateComplete*/}) => {
    const [exercise, setExercise] = useState({})
    useEffect( () => {
        const callApiForWorkout = async(url) => {
          const exerciseData = await getExerciseByUrl(url)
          setExercise(exerciseData[1])
        }
        callApiForWorkout(exerciseUrl)
      },[])

    if(exercise === undefined){
      return <CircularProgress />
    }
    return <ListItemButton>
        <ListItemIcon>
          <SportsFootball />
        </ListItemIcon>
        <ListItemText primary={exercise.name} />
      </ListItemButton>
  }
    
  export default WorkoutListItem;
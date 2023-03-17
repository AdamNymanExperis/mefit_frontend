import { useEffect, useState } from "react";
import {ListItemIcon, ListItemButton, ListItemText} from "@mui/material"
import { FitnessCenter } from "@mui/icons-material"
import { getWorkoutByUrl } from "../../../api/workout";

const WorkoutListItem = ({workoutUrl}) => {
    const [workout, setWorkout] = useState({})

    useEffect( () => {
        const callApiForWorkout = async() => {
          console.log("in item:   " + workoutUrl)
          const workoutData = await getWorkoutByUrl(workoutUrl)
          console.log(workoutData)
          setWorkout(workoutData[1])
        }
        callApiForWorkout()
      },[workoutUrl])

    return <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <FitnessCenter />
        </ListItemIcon>
        <ListItemText primary={workout.name} />
      </ListItemButton>
  }
    
  export default WorkoutListItem;
import { useEffect, useState } from "react";
import {ListItemIcon, ListItemButton, ListItemText, CircularProgress} from "@mui/material"
import { FitnessCenter } from "@mui/icons-material"
import { getWorkoutByUrl } from "../../../api/workout";

const WorkoutListItem = ({workoutUrl /*,index, updateComplete*/}) => {
    const [workout, setWorkout] = useState({})
    const [completed, setCompleted] = useState(false)
    useEffect( () => {
        const callApiForWorkout = async() => {
          const workoutData = await getWorkoutByUrl(workoutUrl)
          setWorkout(workoutData[1])
          setCompleted(workoutData[1].complete)
        }
        callApiForWorkout()
      },[])

    const handleClick = () => {
      setCompleted(!completed)      
      const temp = workout
      temp.complete = !temp.complete
      setWorkout(temp)
      //updateComplete(index)
    };

    if(workout === undefined){
      return <CircularProgress />
    }
    return <ListItemButton 
            sx={{ pl: 4, backgroundColor: completed? "#a7fa9d" : "#ff5c5c", borderRadius: "16px"}}
            onClick={handleClick}>
        <ListItemIcon>
          <FitnessCenter />
        </ListItemIcon>
        <ListItemText primary={workout.name} />
      </ListItemButton>
  }
    
  export default WorkoutListItem;
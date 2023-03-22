import { useEffect, useState } from "react";
import {
    ListItem,
    ListItemText,
    Stack,
    ListItemIcon,
    ListItemButton,
    List,
    Collapse,
    Button
} from "@mui/material"
import { ExpandLess, 
    ExpandMore,
    Flag,
    Edit,
    FitnessCenter      
} from "@mui/icons-material"
import { getWorkoutGoalByUrl } from "../../../api/workoutgoal";
import { getWorkoutByUrl } from "../../../api/workout";
import WorkoutToExerciseAdapter from "./WorkoutToExerciseAdapter"

const WorkoutEditorItem = ({workoutGoalUrl, inGoal}) => {
    const [workout, setWorkout] = useState()
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect( () => {
      const callApi = async(url) => {
        const workoutGoalData = await getWorkoutGoalByUrl(url) 
        const workoutData = await getWorkoutByUrl(workoutGoalData[1].workout)
        setWorkout(workoutData[1])
      }
      callApi(workoutGoalUrl)
    }, [])

    if(workout === undefined) return <p>loading...</p>
    return <>
    <ListItemButton onClick={handleClick} >
    <ListItemIcon>
        <FitnessCenter />
    </ListItemIcon>
  <ListItemText primary={workout.name} />
  <Button>test</Button>
  {open ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  
  <Collapse in={open} timeout="auto" unmountOnExit sx={{ padding: "10px"}}>
    {workout.workoutExercises?.length > 0 && <span>exercises:</span>}
    <List component="div" disablePadding>
      {workout.workoutExercises?.map(
        (workoutExercise, index) => {
          return <WorkoutToExerciseAdapter key={index} url={workoutExercise} /> 
        }
      )}
    </List>
    </Collapse></>
}
    
export default WorkoutEditorItem;
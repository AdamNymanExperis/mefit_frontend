import { useEffect, useState } from "react";
import {
    ListItemText,
    ListItemIcon,
    ListItemButton,
    List,
    Collapse,
    IconButton
} from "@mui/material"
import { ExpandLess, 
    ExpandMore,
    Edit,
    FitnessCenter,
    Delete,
    Add
} from "@mui/icons-material"
import WorkoutToExerciseAdapter from "./WorkoutToExerciseAdapter"
import keycloak from "../../../keycloak";
import { createWorkoutGoal } from "../../../api/workoutgoal";

const WorkoutEditorItem = ({workoutObject, goal, setGoal, setWorkoutGoals, inGoal}) => {
    const [workout, setWorkout] = useState()
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    const handleDelete = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleAdd = async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const newWorkoutGoal = await createWorkoutGoal(goal, workoutObject, keycloak.token)
      const newWorkoutGoalString = "api/v1/workoutGoal/" + newWorkoutGoal[1].id
      const tempGoal = goal
      tempGoal.workoutGoals = [...goal.workoutGoals, newWorkoutGoalString]
      
      setWorkoutGoals(tempGoal.workoutGoals)
    };

    const handleEdit = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    useEffect( () => {
      setWorkout(workoutObject)
    }, [])

    if(workout === undefined) return <p>loading...</p>
    return <>
    <ListItemButton onClick={handleClick} >
    <ListItemIcon>
        <FitnessCenter />
    </ListItemIcon>
  <ListItemText primary={workout.name} />
  {inGoal?
  <IconButton aria-label="delete" onClick={handleDelete}>
    <Delete />
  </IconButton>
  : 
  <>
  <IconButton aria-label="add" onClick={handleAdd}>
    <Add />
  </IconButton>
  <IconButton aria-label="edit" onClick={handleEdit}>
    <Edit />
  </IconButton>
  </>
  }
  
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
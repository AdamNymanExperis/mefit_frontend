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
import keycloak from "../../keycloak";
import { createWorkoutGoal } from "../../api/workoutgoal";
import { deleteWorkoutGoalByUrl }  from "../../api/workoutgoal"

const WorkoutEditorItem = ({workoutObject, goal, setGoal, setWorkoutGoals, inGoal, index}) => {
    const [workout, setWorkout] = useState()
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    const handleDelete = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      if(index >= 0){
        await deleteWorkoutGoalByUrl(goal.workoutGoals[index], keycloak.token)
        
        const tempGoal = goal
        tempGoal.workoutGoals.splice(index,1)
        
        setWorkoutGoals([...tempGoal.workoutGoals])
        setGoal(tempGoal)
      }  
    };

    const handleAdd = async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const newWorkoutGoal = await createWorkoutGoal(goal, workoutObject, keycloak.token)
      const newWorkoutGoalString = "api/v1/workoutGoal/" + newWorkoutGoal[1].id
      const tempGoal = goal
      tempGoal.workoutGoals = [...goal.workoutGoals, newWorkoutGoalString]
      setWorkoutGoals(tempGoal.workoutGoals)
      setGoal(tempGoal)
    };

    const handleEdit = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    useEffect( () => {
      setWorkout(workoutObject)
    }, [workoutObject])

    if(workout === undefined) return <p>loading...</p>
    return <>
    <ListItemButton onClick={handleClick} sx={{margin:"5px", background: "#2196F3",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1769AA"}}}>
    <ListItemIcon>
        <FitnessCenter sx={{color: "white"}}/>
    </ListItemIcon>
  <ListItemText primary={workout.name} />
  {inGoal?
  <IconButton aria-label="delete" onClick={handleDelete}>
    <Delete sx={{color: "white"}} />
  </IconButton>
  : 
  <>
  <IconButton aria-label="add" onClick={handleAdd}>
    <Add sx={{color: "white"}} />
  </IconButton>
  </>
  }
  
  {open ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  
  <Collapse in={open} timeout="auto" unmountOnExit sx={{ borderColor: "#1769AA", padding: "10px"}}>
    {workout.workoutExercises?.length > 0 && <span>exercises:</span>}
    
      {workout.workoutExercises?.map(
        (workoutExercise, index) => {
          return <WorkoutToExerciseAdapter key={index} url={workoutExercise} /> 
        }
      )}
    
  </Collapse></>
}
    
export default WorkoutEditorItem;
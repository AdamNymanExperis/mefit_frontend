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
    Add,
    Event,
    Autorenew,
    CompareArrows
} from "@mui/icons-material"
import WorkoutToExerciseAdapter from "./WorkoutToExerciseAdapter"
import keycloak from "../../keycloak";
import { createWorkoutGoal } from "../../api/workoutgoal";
import { deleteWorkoutGoalByUrl }  from "../../api/workoutgoal"
import { createProgramGoal, deleteProgramGoalByUrl } from "../../api/programGoal";

const ProgramEditorItem = ({programObject, goal, setGoal, setProgramGoals, inGoal, index}) => {
    const [program, setProgram] = useState()

    const handleDelete = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      await deleteProgramGoalByUrl(goal.fitnessProgramGoals[index], keycloak.token)
      const tempGoal = goal
      tempGoal.fitnessProgramGoals.splice(index,1)
      setProgramGoals([...tempGoal.fitnessProgramGoals])
      setGoal(tempGoal)       
    };

    const handleAdd = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      if(goal.fitnessProgramGoals.length > 0) await deleteProgramGoalByUrl(goal.fitnessProgramGoals[0], keycloak.token)
      const newWorkoutGoal = await createProgramGoal(goal, programObject, keycloak.token)
      const newWorkoutGoalString = "api/v1/fitnessprogramgoal/" + newWorkoutGoal[1].id
      const tempGoal = goal
      tempGoal.fitnessProgramGoals = [newWorkoutGoalString]
      setProgramGoals(tempGoal.fitnessProgramGoals)
      setGoal(tempGoal)
    };

    const handleEdit = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    useEffect( () => {
      setProgram(programObject)
    }, [programObject])

    if(program === undefined) return <p>loading...</p>
    return <>
    <ListItemButton sx={{background: "#2196F3",
                  color: "white", margin: "5px",
                  "&:hover": {
                    backgroundColor: "#1769AA"}}}>
    <ListItemIcon>
        <Event  sx={{color: "white"}}/>
    </ListItemIcon>
  <ListItemText primary={program.name} />
  {inGoal?
  <IconButton aria-label="delete" onClick={handleDelete}>
    <Delete sx={{color: "white"}} />
  </IconButton>
  : 
  <>
  <IconButton aria-label="add" onClick={handleAdd}>
    <CompareArrows sx={{color: "white"}} />
  </IconButton>
  </>
  }
  </ListItemButton>
  </>
}
    
export default ProgramEditorItem;
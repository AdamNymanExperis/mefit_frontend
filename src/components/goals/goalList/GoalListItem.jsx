import {
  ListItemText,
  ListItemIcon,
  ListItemButton,
  List,
  Collapse,
  Button,
} from "@mui/material"
import { ExpandLess, ExpandMore, Flag, Edit } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { getGoalById } from "../../../api/goal"
import ProgramListItem from "./ProgramListItem"
import GoalToWorkoutAdapter from "./GoalToWorkoutAdapter"
const apiUrl = process.env.REACT_APP_API_URL

const GoalListItem = ({goalId}) => {

  const [foundGoal, setGoal] = useState({})
  const [open, setOpen] = useState(false);
  const [achieved, setAchieved] = useState(true);
  const [firstTime, setFirstTime] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  }
    
  useEffect( () => {
    const callApiForGoal = async(id) => {
      const data = await getGoalById(id) 
      setGoal(data[1])
    }
    callApiForGoal(goalId)
  }, [])

  return <>
  <ListItemButton onClick={handleClick} sx={{ backgroundColor: foundGoal.achieved? "#a7fa9d" : "#ff5c5c"}}>
    <ListItemIcon>
      <Flag />
    </ListItemIcon>
  <ListItemText primary={foundGoal.title} />
  {open ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  
  <Collapse in={open} timeout="auto" unmountOnExit sx={{ padding: "10px", backgroundColor: foundGoal.achieved? "#d9fad4" : "#ffb8b8"}}>
    {foundGoal.workoutGoals?.length > 0 && <span>Workouts:</span>}
    <List component="div" disablePadding>
      {foundGoal.workoutGoals?.map(
        (workoutGoal, index) => {
          return <GoalToWorkoutAdapter key={index} workoutGoalUrl={workoutGoal} setAchieved={setAchieved}/> 
        }
      )}
    </List>
    {foundGoal.fitnessProgramGoals?.length > 0 && <ProgramListItem programGoalUrl={foundGoal.fitnessProgramGoals[0]} setAchieved={setAchieved}/>}
    
    <Button href={`${apiUrl}/goaleditor?goal=${foundGoal.id}`} endIcon={<Edit />} sx={{ marginTop: "10px", backgroundColor: "white", border: 2, borderRadius: "16px" }}>Edit Goal</Button>
  </Collapse>
  </>
}

export default GoalListItem

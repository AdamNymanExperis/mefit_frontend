import {
  ListItem,
  ListItemText,
  Stack,
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

const GoalListItem = ({ goalId }) => {
  const [open, setOpen] = useState(false)
  const [achievedArr, setAchievedArr] = useState([])
  //const [achieved, setAchieved] = useState(false);

  /*
  const updateAchieved = (index) => {
    const temp = achievedArr
    temp[index] = !temp[index]
    setAchievedArr(temp)
    let isAchieved = true
    temp.forEach( (i) => {
      if(!temp[i]) isAchieved = false
    })
    setAchieved(isAchieved)
  }*/

  const handleClick = () => {
    setOpen(!open)
  }

  const [foundGoal, setGoal] = useState({})

  useEffect(() => {
    const callApiForGoal = async (id) => {
      const data = await getGoalById(id)
      setGoal(data[1])
    }
    callApiForGoal(goalId)
  }, [])

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{ backgroundColor: foundGoal.achieved ? "#a7fa9d" : "#ff5c5c" }}
      >
        <ListItemIcon>
          <Flag />
        </ListItemIcon>
        <ListItemText primary={foundGoal.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          padding: "10px",
          backgroundColor: foundGoal.achieved ? "#d9fad4" : "#ffb8b8",
        }}
      >
        {foundGoal.workoutGoals?.length > 0 && <span>Workouts:</span>}
        <List component="div" disablePadding>
          {foundGoal.workoutGoals?.map((workoutGoal, index) => {
            //setAchievedArr([...achievedArr, false])
            return (
              <GoalToWorkoutAdapter
                key={index}
                workoutGoalUrl={
                  workoutGoal
                } /*index={index} updateComplete={updateAchieved}*/
              />
            )
          })}
        </List>
        {foundGoal.fitnessProgramGoals?.length > 0 && (
          <ProgramListItem programGoalUrl={foundGoal.fitnessProgramGoals[0]} />
        )}

        <Button
          href={"http://localhost:3000/goaleditor?goal=" + foundGoal.id}
          endIcon={<Edit />}
          sx={{
            marginTop: "10px",
            backgroundColor: "white",
            border: 2,
            borderRadius: "16px",
          }}
        >
          Edit Goal
        </Button>
      </Collapse>
    </>
  )
}

/*<ListItem
    key={goal.id}
    sx={{
  // backgroundColor: colors.greenAccent[500],
    margin: "10px 0",
    borderRadius: "2px",
    }}
  >
  <ListItemText
    primary={goal.title}
    /*
                  secondary={
                    {<Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>}
                  } 
                  />    
    
                  </ListItem>*/

export default GoalListItem

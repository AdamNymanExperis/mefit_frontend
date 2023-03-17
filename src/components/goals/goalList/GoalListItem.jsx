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
         Edit        
} from "@mui/icons-material"
import {useState, useEffect} from "react"
import { getGoalById } from "../../../api/goal"
import ProgramListItem from "./ProgramListItem"
import GoalToWorkoutAdapter from "./GoalToWorkoutAdapter"

const GoalListItem = ({goal}) => {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [foundGoal, setGoal] = useState({})
    
  useEffect( () => {
    const callApiForGoal = async(id) => {
      const data = await getGoalById(id) 
      console.log(data[1])
      setGoal(data[1])
    }
    callApiForGoal(goal.id)
  }, [])

  return <><ListItemButton onClick={handleClick}>
    <ListItemIcon>
      <Flag />
    </ListItemIcon>
  <ListItemText primary={goal.title} />
  {open ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
  
  <Collapse in={open} timeout="auto" unmountOnExit>
    {foundGoal.workoutGoals?.length > 0 && <span>Workouts:</span>}
    <List component="div" disablePadding>
      {foundGoal.workoutGoals?.map(
        (workoutGoal, index) => {
          return <GoalToWorkoutAdapter key={index} workoutGoalUrl={workoutGoal}/> 
        }
      )}
    </List>
    {foundGoal.fitnessProgramGoals?.length > 0 && <ProgramListItem programGoalUrl={foundGoal.fitnessProgramGoals[0]} />}
    <Button>Edit Goal<Edit /></Button>
  </Collapse>
  </>
}

//{open ? <ExpandLess /> : <ExpandMore />}

/* <ListItemIcon>
    <InboxIcon />
  </ListItemIcon>
  
  {foundGoal.workoutGoals.map((workoutGoal) => {
        <WorkoutListItem workoutGoalUrl={workoutGoal}/>
      })}
  */ 


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
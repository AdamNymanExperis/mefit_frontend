import { useEffect, useState } from "react"
import {
  ListItemIcon,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material"
import { FitnessCenter } from "@mui/icons-material"
import { getWorkoutByUrl } from "../../../api/workout"
const apiUrl = process.env.REACT_APP_API_URL

const WorkoutListItem = ({ workoutUrl, setAchieved }) => {
  const [workout, setWorkout] = useState({})
  const [completed, setCompleted] = useState(false)
  useEffect(() => {
    const callApiForWorkout = async () => {
      const workoutData = await getWorkoutByUrl(workoutUrl)
      setWorkout(workoutData[1])
      setCompleted(workoutData[1].complete)
      if(workoutData[1].complete == false) setAchieved(false)
    }
    callApiForWorkout()
  }, [])

  
  const handleClick = () => {
    /*
    setCompleted(!completed)
    const temp = workout
    temp.complete = !temp.complete
    setWorkout(temp)
    if(temp.complete == false) setAchieved(false)*/
  }

  if (workout === undefined) {
    return <CircularProgress />
  }
  return (
    <ListItemButton
      sx={{
        pl: 4,
        backgroundColor: completed ? "#a7fa9d" : "#ff5c5c",
        borderRadius: "16px",
      }}
      href={`${apiUrl}displayworkout?workout=${workout.id}`} //onClick={handleClick}
    >
      <ListItemIcon>
        <FitnessCenter />
      </ListItemIcon>
      <ListItemText primary={workout.name} />
    </ListItemButton>
  )
}

export default WorkoutListItem

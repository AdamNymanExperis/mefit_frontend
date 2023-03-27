import { useEffect, useState } from "react"
import { ListItemButton, ListItemText, LinearProgress } from "@mui/material"
import { getWorkoutGoalByUrl } from "../../../api/workoutgoal"
import WorkoutListItem from "./WorkoutListItem"

const GoalToWorkoutAdapter = ({workoutGoalUrl, setAchieved}) => {
  const [workoutGoal, setWorkoutGoal] = useState({})

  useEffect(() => {
    const callApiForWorkoutGoal = async () => {
      const workoutData = await getWorkoutGoalByUrl(workoutGoalUrl)
      setWorkoutGoal(workoutData[1])
    }
    callApiForWorkoutGoal()
  }, [])

  if (workoutGoal.workout === undefined || workoutGoal.workout === null) {
    return <LinearProgress />
  }
  return (
    <WorkoutListItem workoutUrl={workoutGoal.workout} setAchieved={setAchieved} />
  )
}
export default GoalToWorkoutAdapter

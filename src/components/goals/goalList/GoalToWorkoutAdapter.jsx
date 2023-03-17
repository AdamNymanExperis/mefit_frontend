import { useEffect, useState } from "react";
import {ListItemButton, ListItemText} from "@mui/material"
import { getWorkoutGoalByUrl } from "../../../api/workoutgoal";
import WorkoutListItem from "./WorkoutListItem"

const GoalToWorkoutAdapter = ({workoutGoalUrl}) => {
    const [workoutGoal, setWorkoutGoal] = useState({})

    useEffect( () => {
        const callApiForWorkoutGoal = async() => {
          const workoutData = await getWorkoutGoalByUrl(workoutGoalUrl)
          console.log(workoutData[1].workout)
          setWorkoutGoal(workoutData[1])
        }
        callApiForWorkoutGoal()
      }, [])

    return <WorkoutListItem workoutUrl={workoutGoal.workout}/>
  }
    
  export default GoalToWorkoutAdapter;
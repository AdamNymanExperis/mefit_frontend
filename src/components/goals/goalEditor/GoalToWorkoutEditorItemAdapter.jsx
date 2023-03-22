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
import WorkoutEditorItem from "./WorkoutEditorItem"

const GoalToWorkoutEditorItemAdapter = ({workoutGoalUrl, goal, setGoal, setWorkoutGoals, inGoal}) => {
    const [workout, setWorkout] = useState()

    useEffect( () => {
      const callApi = async(url) => {
        const workoutGoalData = await getWorkoutGoalByUrl(url) 
        const workoutData = await getWorkoutByUrl(workoutGoalData[1].workout)
        setWorkout(workoutData[1])
      }
      callApi(workoutGoalUrl)
    }, [])

    if(workout === undefined) return <p>loading...</p>
    return <WorkoutEditorItem workoutObject={workout} goal={goal} setGoal={setGoal} setWorkoutGoals={setWorkoutGoals} inGoal={inGoal} />
}
    
export default GoalToWorkoutEditorItemAdapter;
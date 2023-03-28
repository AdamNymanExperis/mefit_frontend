import { useEffect, useState } from "react";
import {Card, Slide, Grid, Paper, TextField, userProfile, Label, Button, List} from "@mui/material"
import WorkoutEditorItem from "./WorkoutEditorItem"
import { getWorkouts } from "../../api/workout"
import GoalToWorkoutEditorItemAdapter from "./GoalToWorkoutEditorItemAdapter"

const WorkoutEditorCard = ({goal, setGoal, setActiveEditorCard}) => {

  const [workouts, setWorkouts] = useState()
  const [workoutGoals, setWorkoutGoals] = useState([])

  useEffect( () => {
    const CallApiForWorkouts = async() => {
      const data = await getWorkouts() 
      setWorkouts(data[1])
    }
    CallApiForWorkouts()
    setWorkoutGoals(goal.workoutGoals)
  }, [])

  const handleBack = () => {
    setActiveEditorCard("goalEditor")
  }

  if(workouts === undefined){ return <p>loading...</p>}
  return <Paper sx={{marginTop: 10, background: "#E0E1E5"}}>
    <Grid container sx={{padding:"5px"}}>
      <Grid item={true} xs={12}>
        <p>Goal Editor:</p>
      </Grid>
      <Grid item={true} xs={6}>
        <List>
          { workoutGoals.map(
            (workoutGoal, index) => {
              return <GoalToWorkoutEditorItemAdapter key={index} workoutGoalUrl={workoutGoal} goal={goal} setGoal={setGoal} setWorkoutGoals={setWorkoutGoals} index={index} inGoal={true} />
            }
          )}
        </List>
      </Grid>
      <Grid item={true} xs={6}>
      <List>
          {workouts.map(
            (workout, index) => {
              return <WorkoutEditorItem key={index} workoutObject={workout} goal={goal} setGoal={setGoal} setWorkoutGoals={setWorkoutGoals} inGoal={false} index={-1}/>
            }
          )}
        </List>
      </Grid>
      <Grid item={true} xs={12}>
        <Button sx={{ margin: "10px", background: "#2196F3",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1769AA"} }}  onClick={handleBack}>Back</Button>
      </Grid>
    </Grid>
  </Paper> 
}
    
export default WorkoutEditorCard;

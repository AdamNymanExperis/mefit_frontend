import { useEffect, useState } from "react";
import {Card, Slide, Grid, Paper, TextField, userProfile, Label, Button, List} from "@mui/material"
import WorkoutEditorItem from "./WorkoutEditorItem"

const WorkoutEditorCard = ({goal}) => {
  
  /** 
  useEffect( () => {
    const callApiForGoal = async(id) => {
      const data = await getGoalById(id) 
      setGoal(data[1])
    }
    callApiForGoal(goal)
  }, [])*/

  const handleSave = () => {
    // put
    
  }

  const handleBack = () => {
    // back 
  }

  return <Paper>
    <Grid container sx={{padding:"5px"}}>
      <Grid item={true} xs={12}>
        <p>Goal Editor:</p>
      </Grid>
      <Grid item={true} xs={6}>
        <List>
          {goal.workoutGoals?.map(
            (workoutGoal, index) => {
              return <WorkoutEditorItem key={index} workoutGoalUrl={workoutGoal} inGoal={true} />
            }
          )}
        </List>
      </Grid>
      <Grid item={true} xs={6}>
        <p>test</p>
      </Grid>
      <Grid item={true} xs={10}>
        <Button sx={{ marginTop: "10px", backgroundColor: "white", border: 1, borderRadius: "16px" }} onClick={handleSave}>Save</Button>
      </Grid>
      <Grid item={true} xs={2}>
        <Button sx={{ marginTop: "10px", backgroundColor: "white", border: 1, borderRadius: "16px" }}  onClick={handleBack}>Back</Button>
      </Grid>
    </Grid>
  </Paper> 
}
    
export default WorkoutEditorCard;

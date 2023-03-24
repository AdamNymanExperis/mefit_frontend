import { useEffect, useState } from "react";
import {Card, Slide, Grid, Paper, TextField, userProfile, Label, Button, List} from "@mui/material"
import WorkoutEditorItem from "./WorkoutEditorItem"
import { getWorkouts } from "../../api/workout"
import GoalToWorkoutEditorItemAdapter from "./GoalToWorkoutEditorItemAdapter"
import { getPrograms } from "../../api/program";
import ProgramEditorItem from "./ProgramEditorItem";
import GoalToProgramEditorItemAdapter from "./GoalToProgramEditorItemAdapter";

const ProgramEditorCard = ({goal, setGoal, setActiveEditorCard}) => {

  const [programs, setPrograms] = useState()
  const [programGoals, setProgramGoals] = useState([])

  useEffect( () => {
    const CallApiForWorkouts = async() => {
      const data = await getPrograms()
      setPrograms(data[1])
    }
    CallApiForWorkouts()
    
    setProgramGoals(goal.fitnessProgramGoals)
  }, [])

  const handleBack = () => {
    setActiveEditorCard("goalEditor")
  }

  if(programs === undefined){ return <p>loading...</p>}
  return <Paper>
    <Grid container sx={{padding:"5px"}}>
      <Grid item={true} xs={12}>
        <p>Goal Editor:</p>
      </Grid>
      <Grid item={true} xs={6}>
        <List>
        { programGoals.map(
            (programGoal, index) => {
              return <GoalToProgramEditorItemAdapter key={index} programGoalUrl={programGoal} goal={goal} setGoal={setGoal} setProgramGoals={setProgramGoals} index={index} inGoal={true} />
            }
        )}
        </List>
      </Grid>
      <Grid item={true} xs={6}>
      <List>
          {programs.map(
            (program, index) => {
              return <ProgramEditorItem key={index} programObject={program} goal={goal} setGoal={setGoal} setProgramGoals={setProgramGoals} inGoal={false} index={-1}/>
            }
          )}
        </List>
      </Grid>
      <Grid item={true} xs={12}>
        <Button sx={{ marginTop: "10px", backgroundColor: "white", border: 1, borderRadius: "16px" }}  onClick={handleBack}>Back</Button>
      </Grid>
    </Grid>
  </Paper> 
}
    
export default ProgramEditorCard;
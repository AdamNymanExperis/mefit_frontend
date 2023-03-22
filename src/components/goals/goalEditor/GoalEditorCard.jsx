import {Card, Slide, Grid, Paper, TextField, userProfile, Label, Button } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {useState, useEffect} from "react"
import { getGoalById } from "../../../api/goal"
import dayjs from 'dayjs'
import WorkoutEditor from "./WorkoutEditorCard"


function GoalEditorCard() {
    const goalIndex = window.location.href.split('=')[1]
    const [goal, setGoal] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()

    const [activeEditorCard, setActiveEditorCard] = useState("goalEditor")

    useEffect( () => {
      const callApiForGoal = async(id) => {
        const data = await getGoalById(id) 
        setGoal(data[1])
      }
      callApiForGoal(goalIndex)
    }, [])

    const handleSave = () => {
      // put 
    }

    const handleProgram = () => {
      setActiveEditorCard("programEditor")
    }

    const handleWorkout = () => {
      setActiveEditorCard("workoutEditor")
    }

    if(goal === undefined) {
      return <p>loading</p>
    }
    return( <>
      {activeEditorCard === "goalEditor" && (
      <Paper>
        <Grid container sx={{padding:"5px"}}>
          <Grid item={true} xs={12}>
            <p>Goal Editor:</p>
          </Grid>
          <Grid item={true} xs={4}>
            <TextField id="outlined-basic" label={goal.title} variant="outlined" />
          </Grid>
          <Grid item={true} xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker defaultValue={dayjs(goal.start.split("T")[0])} onChange={(newValue) => setStart(newValue)} />
            </LocalizationProvider> 
          </Grid>
          <Grid item={true} xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker defaultValue={dayjs(goal.end.split("T")[0])} onChange={(newValue) => setEnd(newValue)}/>
            </LocalizationProvider> 
          </Grid>
          <Grid item={true} xs={8}>
            <Button sx={{ marginTop: "10px", backgroundColor: "white", border: 1, borderRadius: "16px" }} onClick={handleSave}>Save</Button>
          </Grid>
          <Grid item={true} xs={2}>
            {goal.fitnessProgramGoals?.length <= 0 && <Button sx={{ marginTop: "10px", backgroundColor: "white", border: 1, borderRadius: "16px" }} onClick={handleWorkout}>Workouts</Button>}
          </Grid>
          <Grid item={true} xs={2}>
            {goal.workoutGoals?.length <= 0 && <Button sx={{ marginTop: "10px", backgroundColor: "white", border: 1, borderRadius: "16px" }}  onClick={handleProgram}>Programs</Button>}
          </Grid>
        </Grid>
      </Paper> 
      )}

      {activeEditorCard === "workoutEditor" && (
        <WorkoutEditor goal={goal}/>
      )}

      {activeEditorCard === "programEditor" && (
        <p>program</p>
      )}
      </>
    )  
}
export default GoalEditorCard;
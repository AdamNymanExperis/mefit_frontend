import {Card, Slide, Grid, Paper, TextField, userProfile, Label, Button, Checkbox } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {useState, useEffect} from "react"
import keycloak from "../../keycloak"
import { updateGoal } from "../../api/goal"

import dayjs from 'dayjs'



function GoalEditorCard({goal, setGoal, setActiveEditorCard, achievedFromController}) {
    
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [achieved, setAchieved] = useState(true)

    const handleSave = async () => {
      const tempGoal = goal
      if(start === undefined) tempGoal.start = goal.start; else tempGoal.start = await handleDateFromDatepicker(start);
      if(end === undefined) tempGoal.end = goal.end; else tempGoal.end = await handleDateFromDatepicker(end);
      if(achieved === undefined) tempGoal.achieved = goal.achieved; else tempGoal.achieved = achieved;
      const data = await updateGoal(keycloak.token, tempGoal, goal.id)
      setGoal(tempGoal)
    }

    const handleDateFromDatepicker = async (date) => {
      const test = await Promise.resolve(date)
      const test2 = test.toString()
      const dateArr = test2.split(" ")
      
      const day = parseInt(dateArr[1])+ 1
      let stringDay
      if(day < 10) stringDay = "0"+day
      else stringDay = day

      const months = new Map()
      months.set('Jan', "01")
      months.set('Feb', "02")
      months.set('Mar', "03")
      months.set('Apr', "04")
      months.set('May', "05")
      months.set('Jun', "06")
      months.set('Jul', "07")
      months.set('Aug', "08")
      months.set('Sep', "09")
      months.set('Oct', "10")
      months.set('Nov', "11")
      months.set('Dec', "12")

      const string = `${dateArr[3]}-${months.get(dateArr[2])}-${stringDay}T01:00:00`
      return string
    }

    const handleProgram = () => {
      setActiveEditorCard("programEditor")
    }

    const handleWorkout = () => {
      setActiveEditorCard("workoutEditor")
    }
    
    if(goal === undefined || achievedFromController === undefined ) {
      return <p>loading</p>
    }
    return(
      <Paper sx={{marginTop: 10, background: "#E0E1E5"}}>
        <Grid container sx={{padding:"5px"}}>
          <Grid item={true} xs={12}>
            <p>Goal Editor:</p>
          </Grid>
          <Grid item={true} xs={4}>
            <TextField id="outlined-basic" label={goal.title} variant="outlined" />
          </Grid>
          <Grid item={true} xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker defaultValue={dayjs(goal.start.split("T")[0])} onChange={(newValue) =>setStart(newValue)} />
            </LocalizationProvider> 
          </Grid>
          <Grid item={true} xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker defaultValue={dayjs(goal.end.split("T")[0])} onChange={(newValue) => setEnd(newValue)}/>
            </LocalizationProvider> 
          </Grid>
          <Grid item={true} xs={12}>
            <span>Goal achieved: </span><Checkbox checked={achieved} onChange={(newValue) => setAchieved(!achieved)}/>
          </Grid>
          <Grid item={true} xs={8}>
            <Button sx={{ marginTop: "10px", background: "#2196F3",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1769AA"}}} onClick={handleSave}>Save</Button>
          </Grid>
          <Grid item={true} xs={2}>
            {goal.fitnessProgramGoals?.length <= 0 && <Button sx={{ marginTop: "10px", background: "#2196F3",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1769AA"}}} onClick={handleWorkout}>Workouts</Button>}
          </Grid>
          <Grid item={true} xs={2}>
            {goal.workoutGoals?.length <= 0 && <Button sx={{ marginTop: "10px", background: "#2196F3",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1769AA"}}}  onClick={handleProgram}>Program</Button>}
          </Grid>
        </Grid>
      </Paper>  
    )  
}
export default GoalEditorCard;
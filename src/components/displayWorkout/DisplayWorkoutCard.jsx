import {Card, Slide, Grid, Paper, TextField, userProfile, Label, Button, Checkbox, ListItemIcon, ListItem } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {useState, useEffect} from "react"
import keycloak from "../../keycloak"
import { updateGoal } from "../../api/goal"
import dayjs from 'dayjs'
import { getWorkoutById, updateWorkoutData } from "../../api/workout";
import { getWorkoutExerciseByUrl } from "../../api/workoutExercise";
import { getExerciseByUrl } from "../../api/exercise";
import ExerciseListItem from "../exercises/ExerciseListItem";
import { FitnessCenter } from "@mui/icons-material";



function DisplayWorkoutCard() {

    const workoutIndex = window.location.href.split('=')[1]
    const [workout, setWorkout] = useState()
    const [exercises, setExercises] = useState()
    const [complete, setComplete] = useState()

    useEffect( () => {
        const callApiForExercises = async (id) => {
          const workoutData = await getWorkoutById(id) 
          setWorkout(workoutData[1])
          const workoutExercisesPromise = Promise.all(workoutData[1].workoutExercises.map( async (workoutExerciseUrl, index) => {
            const workoutExerciseData = await getWorkoutExerciseByUrl(workoutExerciseUrl)
            return workoutExerciseData[1]
          }))
          const workoutExercisesData = await Promise.resolve(workoutExercisesPromise)
          const exerciseUrls = []
          workoutExercisesData.map( (workoutExercise) => {
            exerciseUrls.push(workoutExercise.exercise)
          })
          console.log(exerciseUrls)
          const exercisesPromise = Promise.all(exerciseUrls.map( async (exerciseUrl) => {
            const exerciseData = await getExerciseByUrl(exerciseUrl)
            return exerciseData[1]
          }))
          const exercisesData = await Promise.resolve(exercisesPromise)
          setExercises(exercisesData)
          setComplete(workoutData[1].complete)
        }
        callApiForExercises(workoutIndex)
    }, [])

    useEffect( () => {
        const callApiToUpdateWorkout = async () => {
            await updateWorkoutData(keycloak.token, workout.id, workout.name, workout.type, complete)
            console.log("updated")
        }   
        callApiToUpdateWorkout()
    }, [complete])

    const [selected, setSelected] = useState(null);
    
    if(workout === undefined || exercises === undefined) return <p>loading...</p>
    return(
      <Paper sx={{marginTop: 10, background: "#E0E1E5"}}>
        <Grid container sx={{padding:"5px"}}>
          <Grid item={true} xs={4}>
            <ListItem>
                <ListItemIcon>
                    <FitnessCenter />
                </ListItemIcon>
                <p>{workout.name}</p>
            </ListItem>
          </Grid>
          <Grid item={true} xs={4}>
            <ListItem>
                <p>Type: {workout.type}</p>
            </ListItem>
          </Grid>
          <Grid item={true} xs={4}>
            <ListItem>
                <p>Workout is Complete:</p> <Checkbox checked={complete} onChange={(newValue) => setComplete(!complete)}/>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
        {exercises.map((exercise, index) => (
            <ExerciseListItem key={index} exercise={exercise} index={index} selected={selected} setSelected={setSelected}/> 
        ))}
        </Grid> 
      </Paper>  
    )  
}
export default DisplayWorkoutCard;
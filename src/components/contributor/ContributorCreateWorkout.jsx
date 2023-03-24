import { Paper, TextField, Button, Slide, Box, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { getExercises } from "../../api/exercise"
import { createWorkout, updateExerciseIntoWorkout } from "../../api/workout"
import { postWorkoutExercise } from "../../api/workoutExercise"
import keycloak from "../../keycloak"

function ContributorCreateWorkout(props) {
  let [name, setName] = useState(null)
  let [type, setType] = useState(null)
  let [exerciseRows, setExerciseRows] = useState([])
  let [selectedExercise, setSelectedExercise] = useState([])
  let workoutExerciseData = []
  let workoutExerciseid = []

  const columns = [
    { field: "Id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "targetMuscleGroup",
      headerName: "Target Muscle Groupe",
      width: 150,
    },
  ]

  const callApiForExercises = async () => {
    const [error, data] = await getExercises()
    setExerciseRows(data)
    if (error !== null) {
      props.setApiError(error)
    }
  }

  useEffect(() => {
    callApiForExercises()
  }, [])

  const SaveWorkout = async () => {
    props.setSaveMessage(null)
    const workout = {
      name: name,
      type: type,
      complete: false,
    }
    console.log(workout.name)
    const [error, data] = await createWorkout(keycloak.token, workout)
    if (data !== undefined) {
      props.setSaveMessage("Workout Created")
    } else {
      props.setApiError(error)
    }
    workoutExerciseData = selectedExercise.map(
      async (x) => await postWorkoutExercise(keycloak.token, x, data.id)
    )

    console.log(workoutExerciseData)
    workoutExerciseData.map((x) =>
      x.then((value) => {
        workoutExerciseid = value[1].id
      })
    )
    await updateExerciseIntoWorkout(keycloak.token, data.id, workoutExerciseid)
  }

  return (
    <div>
      <Typography
        variant="h5"
        style={{ textAlign: "center" }}
        sx={{ marginTop: 2 }}
      >
        Create Workout
      </Typography>
      <Slide direction="right" in appear>
        <Paper
          sx={{
            p: 2,
            marginTop: 2,
            flexGrow: 1,
            background: "#e0e1e5",
          }}
        >
          <TextField
            required
            id="outlined-required"
            label="Name"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <br />
          <TextField
            required
            id="outlined-required"
            label="type"
            sx={{ marginTop: 2 }}
            onChange={(e) => {
              setType(e.target.value)
            }}
          />
        </Paper>
      </Slide>
      <Box sx={{ height: 400, width: "100%", marginTop: 2 }}>
        <DataGrid
          rows={exerciseRows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            setSelectedExercise(ids)
          }}
        />
      </Box>
      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <Button
          sx={{
            background: "#2196f3",
            color: "white",
            "&:hover": {
              backgroundColor: "#1769aa",
            },
          }}
          onClick={() => SaveWorkout()}
        >
          Save
        </Button>

        <Button
          sx={{
            background: "#2196f3",
            color: "white",
            "&:hover": {
              backgroundColor: "#1769aa",
            },
          }}
          onClick={() => props.goBackToContributorControl()}
        >
          Back
        </Button>
      </Box>
    </div>
  )
}
export default ContributorCreateWorkout

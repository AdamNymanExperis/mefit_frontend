import { Paper, TextField, Grid, Button, Slide } from "@mui/material"
import { useState } from "react"
import { createExercise } from "../../api/exercise"
import keycloak from "../../keycloak"

function CreateExercise(props) {
  let [name, setName] = useState(null)
  let [description, setDescription] = useState(null)
  let [targetMuscleGroup, setTargetMuscleGroup] = useState(null)
  let [imageLink, setImageLink] = useState(null)
  let [videoLink, setVideoLink] = useState(null)

  const SaveExercise = async () => {
    props.setSaveMessage(null)
    const exercise = {
      name: name,
      description: description,
      targetMuscleGroup: targetMuscleGroup,
      imageLink: imageLink,
      videoLink: videoLink,
    }
    const [error, data] = await createExercise(keycloak.token, exercise)
    if (data !== undefined) {
      props.setSaveMessage("Exercise Created")
    } else props.setApiError(error)
  }

  return (
    <Slide direction="right" in appear>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          marginTop: 10,
          minWidth: 250,
          maxWidth: 600,
          flexGrow: 1,
          background: "#e0e1e5",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm>
            <Grid item>
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
                label="Description"
                sx={{ marginTop: 2 }}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
              <br />
              <TextField
                required
                id="outlined-required"
                label="Target Muscle Group"
                sx={{ marginTop: 2 }}
                onChange={(e) => {
                  setTargetMuscleGroup(e.target.value)
                }}
              />
              <br />
              <TextField
                required
                id="outlined-helperText"
                label="Image Link"
                sx={{ marginTop: 2 }}
                onChange={(e) => {
                  setImageLink(e.target.value)
                }}
              />
              <br />
              <TextField
                required
                id="outlined-helperText"
                label="Video Link"
                sx={{ marginTop: 2 }}
                onChange={(e) => {
                  setVideoLink(e.target.value)
                }}
              />
              <br />
            </Grid>
          </Grid>
          <Grid item>
            <Button
              sx={{
                background: "#2196f3",
                color: "white",
                "&:hover": {
                  backgroundColor: "#1769aa",
                },
              }}
              onClick={() => SaveExercise()}
            >
              Save
            </Button>
            <br />
            <Button
              sx={{
                background: "#2196f3",
                color: "white",
                "&:hover": {
                  backgroundColor: "#1769aa",
                },
                marginTop: 2,
              }}
              onClick={() => props.goBackToContributorControl()}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Slide>
  )
}
export default CreateExercise

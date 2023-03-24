import { Button, Slide, Paper, Typography } from "@mui/material"

function ContributorControl(props) {
  return (
    <div>
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
          <Typography variant="h5" style={{ textAlign: "center" }}>
            CREATE
          </Typography>
          <Button
            sx={{
              background: "#2196f3",
              color: "white",
              "&:hover": {
                backgroundColor: "#1769aa",
              },
              marginTop: 2,
            }}
            onClick={() => props.setActiveProfileCard("CreateExercise")}
          >
            Exercise
          </Button>
          <Button
            sx={{
              background: "#2196f3",
              color: "white",
              "&:hover": {
                backgroundColor: "#1769aa",
              },
              marginTop: 2,
              marginLeft: 2,
            }}
            onClick={() => props.setActiveProfileCard("CreateWorkout")}
          >
            Workout
          </Button>
        </Paper>
      </Slide>
    </div>
  )
}
export default ContributorControl

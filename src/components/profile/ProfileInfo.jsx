import keycloak from "../../keycloak"
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Button,
  Slide,
  List,
} from "@mui/material"
import GoalListItem from "../goals/goalList/GoalListItem"
import ImpairmentListItem from "../impairments/ImpairmentListItem"
import { useEffect, useState } from "react"

function ProfileInfo(props) {
  const [currentGoals, setCurrentGoals] = useState([])
  useEffect(() => {
    setCurrentGoals(
      props.userProfile.goals.map((x) =>
        parseInt(x.substring(x.lastIndexOf("/") + 1))
      )
    )
  }, [props.userProfile.goals])

  if (currentGoals.length <= 0) return <p>Loading</p>
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
          <Grid container spacing={2}>
            <Grid item>
              <Avatar sx={{ width: 100, height: 100 }} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  {keycloak.tokenParsed && (
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      <p>Name: {keycloak.tokenParsed.name}</p>
                      <p>Username: {keycloak.tokenParsed.preferred_username}</p>
                      <p>Weight: {props.userProfile.weight}</p>
                      <p>Height: {props.userProfile.height}</p>
                    </Typography>
                  )}
                </Grid>
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
                onClick={() => props.setActiveProfileCard("EditProfile")}
              >
                Edit Profile
              </Button>
              <br></br>
              <Button
                sx={{
                  marginTop: 1,
                  background: "#2196f3",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1769aa",
                  },
                }}
                onClick={() =>
                  keycloak.login({
                    action: "UPDATE_PASSWORD",
                  })
                }
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Slide>
      <Slide direction="right" in appear>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: "auto" }}
        >
          <Grid item xs={12} sx={{ margin: "auto" }}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                minWidth: 150,
                maxWidth: 600,
                flexGrow: 1,
                background: "#e0e1e5",
              }}
            >
              <Grid item xs>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  My Goals
                </Typography>
                <List>
                  {currentGoals.map((currentGoal) => (
                    <GoalListItem key={currentGoal} goalId={currentGoal} />
                  ))}
                </List>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sx={{ margin: "auto" }}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                minWidth: 150,
                maxWidth: 600,
                flexGrow: 1,
                background: "#e0e1e5",
              }}
            >
              <Typography variant="h5" style={{ textAlign: "center" }}>
                My Impairment
              </Typography>
              {props.userProfile.impairments.map((impairment, index) => (
                <ImpairmentListItem key={index} impairmentURL={impairment} />
              ))}
              <Button
                sx={{
                  marginTop: 1,
                  background: "#2196f3",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1769aa",
                  },
                }}
                onClick={() => props.setActiveProfileCard("EditImpairments")}
              >
                Edit Impairments
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Slide>
    </div>
  )
}
export default ProfileInfo

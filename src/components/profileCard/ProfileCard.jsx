import keycloak from "../../keycloak"
import { useEffect, useState } from "react"
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  ButtonBase,
  Button,
  Alert,
  Fade,
} from "@mui/material"
import { checkProfile } from "../../api/profile"

function ProfileCard() {
  const [userProfile, setUserProfile] = useState([])
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    const setProfileDataInVariable = async () => {
      const [error, data] = await checkProfile(
        keycloak.token,
        keycloak.tokenParsed.sub
      )
      setUserProfile(data)
      if (error !== null) {
        setApiError(error)
      }
    }
    setProfileDataInVariable()
  }, [])

  return (
    <div>
      {apiError && (
        <Fade in appear>
          <Alert sx={{ marginTop: 2 }} severity="error">
            {apiError}
          </Alert>
        </Fade>
      )}
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          marginTop: 10,
          minWidth: 250,
          maxWidth: 600,
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Avatar
                src="/static/images/avatar/1.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                {keycloak.tokenParsed && (
                  <Typography gutterBottom variant="subtitle1" component="div">
                    <p>Name: {keycloak.tokenParsed.name}</p>
                    <p>Username: {keycloak.tokenParsed.preferred_username}</p>
                    <p>Sub: {keycloak.tokenParsed.sub}</p>
                    <p>Weight: {userProfile.weight}</p>
                    <p>Height: {userProfile.height}</p>
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
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
export default ProfileCard

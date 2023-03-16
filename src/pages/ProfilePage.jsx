import keycloak from "../keycloak"
import { useEffect, useState } from "react"
import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import ButtonBase from "@mui/material/ButtonBase"
import Button from "@mui/material/Button"
import { checkProfile } from "../api/profile"

function ProfilePage() {
  const [userProfile, setUserProfile] = useState([])
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    const setProfileDataInVariable = async () => {
      const [data, checkError] = await checkProfile(
        keycloak.token,
        keycloak.tokenParsed.sub
      )
      if (checkError !== null) {
        setApiError(checkError)
      }
      setUserProfile(data)
      console.log(data)
    }
    setProfileDataInVariable()
  }, [])

  return (
    <div>
      {apiError && <p>{apiError}</p>}
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
export default ProfilePage

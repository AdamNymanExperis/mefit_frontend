import keycloak from "../../keycloak"
import { useState } from "react"
import { Grid, Paper, Button, Slide, TextField } from "@mui/material"
import { changeProfileData } from "../../api/profile"

function ProfileEdit(props) {
  let [weight, setWeight] = useState("")
  let [height, setHeight] = useState("")

  async function EditProfile() {
    if (weight === "") {
      weight = props.userProfile.weight
    }
    if (height === "") {
      height = props.userProfile.height
    }
    let message = await changeProfileData(
      keycloak.token,
      keycloak.tokenParsed.sub,
      props.userProfile.id,
      weight,
      height
    )
    if (message === "success") {
      props.setsaveMessage("Profile Saved")
      props.setApiError(null)
    } else {
      props.setApiError(message)
      props.setsaveMessage(null)
    }
  }
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
            <Grid item xs={12} sm>
              <Grid item>
                <TextField
                  required
                  id="outlined-required"
                  defaultValue={props.userProfile.weight}
                  label="Current Weight"
                  onChange={(e) => {
                    setWeight(e.target.value)
                  }}
                />
                <br />
                <TextField
                  required
                  id="outlined-required"
                  label="Current Height"
                  defaultValue={props.userProfile.height}
                  sx={{ marginTop: 2 }}
                  onChange={(e) => {
                    setHeight(e.target.value)
                  }}
                />
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
                onClick={() => EditProfile()}
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
                onClick={() => props.goBackToProfileAndUpdateData()}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </div>
  )
}
export default ProfileEdit

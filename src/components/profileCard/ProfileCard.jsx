import keycloak from "../../keycloak";
import { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Button,
  Alert,
  Slide,
  TextField,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { changeProfileData, checkProfile } from "../../api/profile";

function ProfileCard() {
  const [userProfile, setUserProfile] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [activeProfileCard, setActiveProfileCard] = useState("Profile");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const setProfileDataInVariable = async () => {
    const [error, data] = await checkProfile(
      keycloak.token,
      keycloak.tokenParsed.sub
    );

    setUserProfile(data);
    console.log(data);
    if (error !== null) {
      setApiError(error);
    }
  };

  useEffect(() => {
    setProfileDataInVariable();
  }, []);

  function EditProfile() {
    if (weight === "") {
      console.log(userProfile.weight);
    } else {
      console.log(weight);
    }
    if (height === "") {
      console.log(userProfile.weight);
    } else {
      console.log(height);
    }
    console.log(userProfile.id);
    changeProfileData(
      keycloak.token,
      keycloak.tokenParsed.sub,
      userProfile.id,
      weight,
      height
    );
    setProfileDataInVariable();
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      {apiError && (
        <Slide direction="down" in appear>
          <Alert sx={{ marginTop: 2 }} severity="error">
            {apiError}
          </Alert>
        </Slide>
      )}
      {activeProfileCard === "Profile" && (
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
                        <p>
                          Username: {keycloak.tokenParsed.preferred_username}
                        </p>
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
                  onClick={() => setActiveProfileCard("EditProfile")}
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
                  onClick={() => setActiveProfileCard("ChangePassword")}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Slide>
      )}

      {activeProfileCard === "ChangePassword" && (
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
                    label="Old Password"
                  />
                  <br />
                  <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    sx={{ marginBottom: 2, marginTop: 2 }}
                  />
                  <br />
                  <TextField
                    required
                    id="outlined-required"
                    label="Confirm Password"
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
                  onClick={() => setActiveProfileCard("Profile")}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Slide>
      )}

      {activeProfileCard === "EditProfile" && (
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
                    defaultValue={userProfile.weight}
                    label="Current Weight"
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                  />
                  <br />
                  <TextField
                    required
                    id="outlined-required"
                    label="Current Height"
                    defaultValue={userProfile.height}
                    sx={{ marginTop: 2 }}
                    onChange={(e) => {
                      setHeight(e.target.value);
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
                  onClick={() => setActiveProfileCard("Profile")}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Slide>
      )}
    </div>
  );
}
export default ProfileCard;

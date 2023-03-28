import keycloak from "../../keycloak"
import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import DrawerComponent from "../drawer/Drawer"
import { Link } from "react-router-dom"
import Image from "./mefitIcon_white.png"

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {keycloak.authenticated && <DrawerComponent />}
          <img src={Image} width="40px"></img>
          <Typography variant="h6" component="div" sx={{ marginLeft: "15px", flexGrow: 1 }}>
            Me-Fit Application
          </Typography>
          {keycloak.authenticated && keycloak.tokenParsed && (
            <div>
              <Button color="inherit" component={Link} to="/profile">
                {keycloak.tokenParsed.preferred_username}
              </Button>
              <Button
                sx={{
                  background: "white",
                  color: "#2196f3",
                  "&:hover": {
                    backgroundColor: "#2196f3",
                    color: "white",
                  },
                  marginLeft: 5,
                }}
                onClick={() => keycloak.logout()}
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Navbar

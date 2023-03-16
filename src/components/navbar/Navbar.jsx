import keycloak from "../../keycloak"
import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import DrawerComponent from "../drawer/Drawer"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {keycloak.authenticated && <DrawerComponent />}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Me-Fit Application
          </Typography>
          {keycloak.authenticated && keycloak.tokenParsed && (
            <Button color="inherit" component={Link} to="/profile">
              {keycloak.tokenParsed.preferred_username}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Navbar

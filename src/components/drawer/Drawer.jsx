import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import ProfileIcon from "@mui/icons-material/AccountBox"
import GoalIcon from "@mui/icons-material/Flag"
import WorkoutIcon from "@mui/icons-material/FitnessCenter"
import ExerciseIcon from "@mui/icons-material/SportsFootball"
import HandshakeIcon from "@mui/icons-material/Handshake"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import MenuIcon from "@mui/icons-material/Menu"
import keycloak from "../../keycloak"

const pages = ["Profile", "Goal", "Workout", "Exercise"]
const listIcon = [
  <ProfileIcon />,
  <GoalIcon />,
  <WorkoutIcon />,
  <ExerciseIcon />,
]
const routes = ["/profile", "/goaldashboard", "/workout", "/exercise"]
const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List sx={{ width: 300 }}>
          {pages.map((page, index) => (
            <ListItemButton
              key={index}
              component={Link}
              to={routes[index]}
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemIcon>
                {listIcon[index]}
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}

          {keycloak.tokenParsed.roles.includes("USER") && (
            <ListItemButton
              component={Link}
              to={"/contributor"}
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemIcon>
                <HandshakeIcon />
                <ListItemText>Contributor</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          )}
          {keycloak.tokenParsed.roles.includes("ADMIN") && (
            <ListItemButton
              component={Link}
              to={"/admin"}
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemIcon>
                <AdminPanelSettingsIcon />
                <ListItemText>Admin</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  )
}

export default DrawerComponent

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
import {
  AccountBox,
  Flag,
  SportsFootball,
  Handshake,
  AdminPanelSettings,
  Menu,
} from "@mui/icons-material"
import keycloak from "../../keycloak"

//Page Names for the list
const pages = ["Profile", "Goal", "Exercise"]
//Icon the list
const listIcon = [<AccountBox />, <Flag />, <SportsFootball />]
//routes for the List
const routes = ["/profile", "/goaldashboard", "/exercise"]

//Local State
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

          {keycloak.tokenParsed.roles.includes("CONTRIBUTOR") && (
            <ListItemButton
              component={Link}
              to={"/contributor"}
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemIcon>
                <Handshake />
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
                <AdminPanelSettings />
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
        <Menu color="white" />
      </IconButton>
    </React.Fragment>
  )
}

export default DrawerComponent

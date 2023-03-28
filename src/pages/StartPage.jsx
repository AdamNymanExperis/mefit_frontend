import keycloak from "../keycloak"
import { checkProfile } from "../api/profile"
import {Paper, Button} from "@mui/material"
import { maxWidth } from "@mui/system"
/**
 * Example Start Page using Keycloak Context.
 */
function StartPage() {
  const callApiForCheckUser = async () => {
    await checkProfile(keycloak.token, keycloak.tokenParsed.sub)
  }
  if (keycloak.authenticated) {
    callApiForCheckUser()
  }

  return (
    <Paper sx={{  margin: "auto", marginTop: 10, background: "#E0E1E5", textAlign:"center", padding:"20px", minWidth: 250,
    maxWidth: 600,}} >
      {!keycloak.authenticated && (<>
      <h1>Welcome to Me-Fit!</h1>
      
      <section className="actions">
        
          <Button onClick={() => keycloak.login()} sx={{background: "#2196F3",
          color: "white",
          "&:hover": {
            backgroundColor: "#1769AA"}}} >Login</Button>
        
      </section></>
      )}

      {keycloak.token && (
        <h1>Welcome {keycloak.tokenParsed.name}!</h1>
      )}
    </Paper>
  )
}
export default StartPage

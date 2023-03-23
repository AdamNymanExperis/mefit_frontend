import keycloak from "../keycloak"
import ExerciseList from "../components/exercises/ExerciseList"
import { useEffect } from "react"
import { checkProfile } from "../api/profile"
/**
 * Example Start Page using Keycloak Context.
 */
function StartPage() {
  const callApiForCheckUser = async () => {
    const [error, data] = await checkProfile(
      keycloak.token,
      keycloak.tokenParsed.sub
    )
  }
  if (keycloak.authenticated) {
    callApiForCheckUser()
  }

  return (
    <div>
      <h1>Start Page</h1>
      <section className="actions">
        {!keycloak.authenticated && (
          <button onClick={() => keycloak.login()}>Login</button>
        )}
        {keycloak.authenticated && (
          <button onClick={() => keycloak.logout()}>Logout</button>
        )}
      </section>

      {keycloak.token && (
        <div>
          <h4>Token</h4>
          <pre>{keycloak.token}</pre>
        </div>
      )}
    </div>
  )
}
export default StartPage

import { BrowserRouter, Route, Routes } from "react-router-dom"
import StartPage from "./pages/StartPage"
import ProfilePage from "./pages/ProfilePage"
import Navbar from "./components/navbar/Navbar"
import KeycloakRoute from "./routes/KeycloakRoute"
import { ROLES } from "./const/roles"
import GoalDashboard from "./pages/GoalDashboard"
import ExercisePage from "./pages/ExercisePage"
import DisplayWorkout from "./pages/DisplayWorkout"
import GoalEditor from "./pages/GoalEditor"
import ContributorController from "./components/contributor/ContributorController"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            path="/goaldashboard"
            element={
              <KeycloakRoute role={ROLES.User}>
                <GoalDashboard />
              </KeycloakRoute>
            }
          />
          <Route
            path="/exercise"
            element={
              <KeycloakRoute role={ROLES.User}>
                <ExercisePage />
              </KeycloakRoute>
            }
          />
          <Route
            path="/goaleditor"
            element={
              <KeycloakRoute role={ROLES.User}>
                <GoalEditor />
              </KeycloakRoute>
            }
          />
          <Route
            path="/displayworkout"
            element={
              <KeycloakRoute role={ROLES.User}>
                <DisplayWorkout />
              </KeycloakRoute>
            }
          />
          <Route
            path="/contributor"
            element={
              <KeycloakRoute role={ROLES.Contributor}>
                <ContributorController />
              </KeycloakRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <KeycloakRoute role={ROLES.User}>
                <ProfilePage />
              </KeycloakRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

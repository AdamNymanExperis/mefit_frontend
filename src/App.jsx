import { BrowserRouter, Route, Routes } from "react-router-dom"
import StartPage from "./pages/StartPage"
import ProfilePage from "./pages/ProfilePage"
import Navbar from "./components/navbar/Navbar"
import KeycloakRoute from "./routes/KeycloakRoute"
import { ROLES } from "./const/roles"
import GoalDashboard from "./pages/GoalDashboard"
import ExercisePage from "./pages/ExercisePage"
import GoalEditor from "./pages/GoalEditor"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/goaldashboard" element={<GoalDashboard />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/goaleditor" element={<GoalEditor />} />
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

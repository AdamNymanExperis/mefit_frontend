import { useState } from "react"
import ContributorControl from "./ContributorControl"
import ContributorCreateExercise from "./ContributorCreateExercise"
import ContributorCreateWorkout from "./ContributorCreateWorkout"
import { Alert, Slide } from "@mui/material"

function ContributorController() {
  const [activeProfileCard, setActiveProfileCard] = useState(
    "ContributorControls"
  )
  const [apiError, setApiError] = useState(null)
  const [saveMessage, setSaveMessage] = useState(null)

  const goBackToContributorControl = () => {
    setActiveProfileCard("ContributorControls")
    setApiError(null)
    setSaveMessage(null)
  }

  return (
    <div>
      {apiError && (
        <Slide direction="down" in appear>
          <Alert sx={{ marginTop: 2 }} severity="error">
            {apiError}
          </Alert>
        </Slide>
      )}
      {saveMessage && (
        <Slide direction="down" in appear>
          <Alert sx={{ marginTop: 2 }} severity="success">
            {saveMessage}
          </Alert>
        </Slide>
      )}
      {activeProfileCard === "ContributorControls" && (
        <ContributorControl setActiveProfileCard={setActiveProfileCard} />
      )}
      {activeProfileCard === "CreateExercise" && (
        <ContributorCreateExercise
          goBackToContributorControl={goBackToContributorControl}
          setSaveMessage={setSaveMessage}
          setApiError={setApiError}
        />
      )}
      {activeProfileCard === "CreateWorkout" && (
        <ContributorCreateWorkout
          goBackToContributorControl={goBackToContributorControl}
          setSaveMessage={setSaveMessage}
          setApiError={setApiError}
        />
      )}
    </div>
  )
}
export default ContributorController

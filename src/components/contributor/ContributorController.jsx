import { useState } from "react"
import ContributorControl from "./ContributorControl"
import ContributorCreateExercise from "./ContributorCreateExercise"
import ContributorCreateWorkout from "./ContributorCreateWorkout"
import { Alert, Slide } from "@mui/material"

function ContributorController() {
  //local State
  const [activeContributorCard, setActiveContributorCard] = useState(
    "ContributorControls"
  )
  const [apiError, setApiError] = useState(null)
  const [saveMessage, setSaveMessage] = useState(null)

  const goBackToContributorControl = () => {
    setActiveContributorCard("ContributorControls")
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
      {activeContributorCard === "ContributorControls" && (
        <ContributorControl
          setActiveContributorCard={setActiveContributorCard}
        />
      )}
      {activeContributorCard === "CreateExercise" && (
        <ContributorCreateExercise
          goBackToContributorControl={goBackToContributorControl}
          setSaveMessage={setSaveMessage}
          setApiError={setApiError}
        />
      )}
      {activeContributorCard === "CreateWorkout" && (
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

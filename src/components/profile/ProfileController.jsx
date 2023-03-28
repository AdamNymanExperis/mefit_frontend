import keycloak from "../../keycloak"
import { useEffect, useState } from "react"
import { Alert, Slide } from "@mui/material"
import { checkProfile } from "../../api/profile"
import ProfileEdit from "./ProfileEdit"
import ProfileInfo from "./ProfileInfo"
import ImpairmentEdit from "../impairments/ImpairmentEdit"

function ProfileCard() {
  //Local States
  const [userProfile, setUserProfile] = useState([])

  //Error and Success Message Alert state
  const [apiError, setApiError] = useState(null)
  const [saveMessage, setSaveMessage] = useState(null)

  // Control component to show state
  const [activeProfileCard, setActiveProfileCard] = useState("Profile")

  //Get User Profile data
  const setProfileDataInVariable = async () => {
    setUserProfile([])
    const [error, data] = await checkProfile(
      keycloak.token,
      keycloak.tokenParsed.sub
    )
    console.log(data)
    setUserProfile(data)
    if (error !== null) {
      setApiError(error)
    }

    console.log(userProfile)
  }

  //Handler
  //Go back to Profile info component and reset the alert state
  const goBackToProfileAndUpdateData = () => {
    setActiveProfileCard("Profile")
    setProfileDataInVariable()
    setApiError(null)
    setSaveMessage(null)
  }

  //side effect
  useEffect(() => {
    setProfileDataInVariable()
    if (userProfile.id !== undefined) {
      setActiveProfileCard("Profile")
    }
  }, [])

  //wait for UserProfile data to get fetched
  if (userProfile.id === undefined) return <p>loading</p>
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
      {activeProfileCard === "Profile" && (
        <ProfileInfo
          setApiError={setApiError}
          setActiveProfileCard={setActiveProfileCard}
          userProfile={userProfile}
        />
      )}
      {activeProfileCard === "EditProfile" && (
        <ProfileEdit
          setApiError={setApiError}
          setActiveProfileCard={setActiveProfileCard}
          setSaveMessage={setSaveMessage}
          setProfileDataInVariable={setProfileDataInVariable}
          goBackToProfileAndUpdateData={goBackToProfileAndUpdateData}
          userProfile={userProfile}
        />
      )}

      {activeProfileCard === "EditImpairments" && (
        <ImpairmentEdit
          setApiError={setApiError}
          goBackToProfileAndUpdateData={goBackToProfileAndUpdateData}
          userProfile={userProfile}
        />
      )}
    </div>
  )
}
export default ProfileCard

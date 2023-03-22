import keycloak from "../../keycloak"
import { useEffect, useState } from "react"
import { Alert, Slide } from "@mui/material"
import { checkProfile } from "../../api/profile"
import ProfileEdit from "./ProfileEdit"
import ProfileInfo from "./ProfileInfo"
import ImpairmentEdit from "../impairments/ImpairmentEdit"

function ProfileCard() {
  const [userProfile, setUserProfile] = useState([])
  const [apiError, setApiError] = useState(null)
  const [activeProfileCard, setActiveProfileCard] = useState("Profile")
  const [saveMessage, setSaveMessage] = useState(null)

  const setProfileDataInVariable = async () => {
    const [error, data] = await checkProfile(
      keycloak.token,
      keycloak.tokenParsed.sub
    )
    setUserProfile(data)
    if (error !== null) {
      setApiError(error)
    }
  }

  const goBackToProfileAndUpdateData = () => {
    setActiveProfileCard("Profile")
    setProfileDataInVariable()
  }

  useEffect(() => {
    setProfileDataInVariable()
  }, [])

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
          setSaveMessage={setSaveMessage}
          goBackToProfileAndUpdateData={goBackToProfileAndUpdateData}
          userProfile={userProfile}
        />
      )}
    </div>
  )
}
export default ProfileCard

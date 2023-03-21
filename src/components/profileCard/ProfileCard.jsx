import keycloak from "../../keycloak"
import { useEffect, useState } from "react"
import { Alert, Slide } from "@mui/material"
import { checkProfile } from "../../api/profile"
import ProfileEdit from "./ProfileEdit"
import ProfileInfo from "./ProfileInfo"

function ProfileCard() {
  const [userProfile, setUserProfile] = useState([])
  const [apiError, setApiError] = useState(null)
  const [activeProfileCard, setActiveProfileCard] = useState("Profile")
  const [profileSaveMessage, setProfileSaveMessage] = useState(null)

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
      {profileSaveMessage && (
        <Slide direction="down" in appear>
          <Alert sx={{ marginTop: 2 }} severity="success">
            {profileSaveMessage}
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
          setProfileSaveMessage={setProfileSaveMessage}
          setProfileDataInVariable={setProfileDataInVariable}
          userProfile={userProfile}
        />
      )}
    </div>
  )
}
export default ProfileCard

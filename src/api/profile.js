import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getProfile = async (token, id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/profile/${id}`, {
      headers: { Authorization: `Bearer  ${token}` },
    })
    return Promise.resolve({
      profile: data,
      error: null,
    })
  } catch (e) {
    return Promise.reject({
      error: e.message,
      profile: null,
    })
  }
}

/**
 * SAMPLE FUNCTION: Create a new user on the database
 * @param {any} user User to be added to API's database
 * @returns { Promise<{user: any, error: string | null}> } user
 */
export const createProfile = async (profile, token) => {
  try {
    const { data } = await axios.post(`${apiUrl}/profile/`, {
      headers: { Authorization: `Bearer  ${token}` },
      profile: profile,
    })
    return Promise.resolve({
      profile: data,
      error: null,
    })
  } catch (e) {
    return Promise.reject({
      profile: null,
      error: e.message,
    })
  }
}

export const checkProfile = async (token, id) => {
  const [checkError, profile] = await getProfile(token, id)

  if (checkError !== null) {
    return [null, profile]
  }
  const newProfile = [id, 0, 0]
  return await createProfile(newProfile, token)
}

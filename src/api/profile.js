import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getProfile = async (token, id) => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/profile/${id}`, {
      headers: { Authorization: `Bearer  ${token}` },
    })
    if (!response.status === "200") {
      throw new Error(response.error)
    }
    const data = response.data
    return [null, data]
  } catch (e) {
    return [e.message, []]
  }
}

/**
 * SAMPLE FUNCTION: Create a new user on the database
 * @param {any} user User to be added to API's database
 * @returns { Promise<{user: any, error: string | null}> } user
 */
export const createProfile = async (id, token) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/profile`, {
      headers: { Authorization: `Bearer  ${token}` },
      weight: 0,
      height: 0,
      keycloakId: id,
    })
    if (!response.status === "200") {
      throw new Error(response.error)
    }
    const data = response.data
    return [null, data]
  } catch (e) {
    return [e.message, []]
  }
}

export const checkProfile = async (token, id) => {
  const [error, profile] = await getProfile(token, id)
  if (error === null) {
    return [null, profile]
  }
  return await createProfile(id, token)
}

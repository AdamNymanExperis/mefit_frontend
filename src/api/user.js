import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getUser = async (token) => {
  const response = await fetch(`${apiUrl}/api/v1/user/1`, {
    headers: { Authorization: `Bearer  ${token}` },
  })
  try {
    if (!response.ok) {
      throw new Error("User not found")
    }
    const data = await response.json()
    return [null, data]
  } catch (error) {
    return [error.message, []]
  }
}

/**
 * SAMPLE FUNCTION: Create a new user on the database
 * @param {any} user User to be added to API's database
 * @returns { Promise<{user: any, error: string | null}> } user
 */
export const createProfile = async (user) => {
  try {
    const { data } = await axios.get("URL-TO-API", {
      data: user,
    })
    return Promise.resolve({
      user: data,
      error: null,
    })
  } catch (e) {
    return Promise.reject({
      error: e.message,
      user: null,
    })
  }
}

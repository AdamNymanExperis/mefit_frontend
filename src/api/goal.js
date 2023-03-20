import axios from "."
const apiUrl = process.env.REACT_APP_API_URL


export const getGoalsByProfileId = async (profileId) => {
  const response = await axios.get(`${apiUrl}/api/v1/goals/profile/${profileId}`)
  try {
    if (!response.status === 200) {
      throw new Error("goals not found")
    }
    const data = response.data
    return [null, data]
  } catch (error) {
    return [error.message, []]
  }
}


export const getGoalById = async (goalId) => {
  const response = await axios.get(`${apiUrl}/api/v1/goal/${goalId}`)
  try {
    if (!response.status === 200) {
      throw new Error("goal not found")
    }
    const data = response.data
    return [null, data]
  } catch (error) {
    return [error.message, []]
  }
}

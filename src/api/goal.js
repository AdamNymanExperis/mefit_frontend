import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getGoalsByProfileId = async (profileId) => {
  const response = await axios.get(
    `${apiUrl}/api/v1/goals/profile/${profileId}`
  )
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

export const createGoal = async (token, goal) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/goal`, {
      headers: { Authorization: `Bearer  ${token}` },
      title: goal.title,
      start: goal.start,
      end: goal.end,
      achieved: goal.achieved,
      profileId: goal.profileId,
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

export const deleteGoal = async (token, goalId) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/v1/goal/${goalId}`, {
      headers: { Authorization: `Bearer  ${token}` },
    })
    if (!response.status === "200") {
      throw new Error(response.error)
    }
    //const data = response.data
    //return [null, data]
  } catch (e) {
    return [e.message, []]
  }
}

export const updateGoal = async (token, goal, goalId) => {
  try {
    const response = await axios.put(`${apiUrl}/api/v1/goal/${goalId}`, {
      headers: { Authorization: `Bearer  ${token}` },
      id: goal.id,
      title: goal.title,
      start: goal.start,
      end: goal.end,
      achieved: goal.achieved,
      profileId: goal.profileId,
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
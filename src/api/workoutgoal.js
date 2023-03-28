import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getWorkoutGoalByUrl = async (workoutGoalUrl) => {
    const response = await axios.get(`${apiUrl}/${workoutGoalUrl}`)
    try {
      if (!response.status === 200) {
        throw new Error("workoutgoal not found")
      }
      const data = response.data
      return [null, data]
    } catch (error) {
      return [error.message, []]
    }
  }

  export const createWorkoutGoal = async (goal, workout, token) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/workoutgoal`, {
        headers: { Authorization: `Bearer  ${token}` },
        startDate: goal.start,
        endDate: goal.end,
        workoutId: workout.id,
        goalId: goal.id
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

export const deleteWorkoutGoalByUrl = async (workoutGoalUrl, token) => {
  try {
    const response = await axios.delete(`${apiUrl}/${workoutGoalUrl}`, {
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


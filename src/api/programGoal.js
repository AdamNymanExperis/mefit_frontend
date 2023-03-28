import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getProgramGoalByUrl = async (programGoalUrl) => {
    const response = await axios.get(`${apiUrl}/${programGoalUrl}`)
    try {
      if (!response.status === 200) {
        throw new Error("programgoal not found")
      }
      const data = response.data
      return [null, data]
    } catch (error) {
      return [error.message, []]
    }
}

export const deleteProgramGoalByUrl = async (programGoalUrl, token) => {
  try {
    const response = await axios.delete(`${apiUrl}/${programGoalUrl}`, {
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

export const createProgramGoal = async (goal, program, token) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/fitnessprogramgoal`, {
      headers: { Authorization: `Bearer  ${token}` },
      startDate: goal.start,
      endDate: goal.end,
      fitnessProgramId: program.id,
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


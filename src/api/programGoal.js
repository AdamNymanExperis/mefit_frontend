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
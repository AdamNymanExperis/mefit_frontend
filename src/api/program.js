import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getProgramByUrl = async (workoutUrl) => {
    const response = await axios.get(`${apiUrl}/${workoutUrl}`)
    try {
      if (!response.status === 200) {
        throw new Error("program not found")
      }
      const data = response.data
      return [null, data]
    } catch (error) {
      return [error.message, []]
    }
  }

export const getPrograms = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/fitnessprograms`)
  try {
    if (!response.status === 200) {
      throw new Error("programs not found")
    }
    const data = response.data
    return [null, data]
  } catch (error) {
    return [error.message, []]
  }
}
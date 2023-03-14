import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getExercises = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/exercises`)
  try {
    if (!response.status == 200) {
      throw new Error("Exercises not found")
    }
    const data = response.data
    return [null, data]
  } catch (error) {
    return [error.message, []]
  }
}
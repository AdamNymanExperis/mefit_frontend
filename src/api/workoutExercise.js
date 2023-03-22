import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getWorkoutExerciseByUrl = async (url) => {
    const response = await axios.get(`${apiUrl}/${url}`)
    try {
      if (!response.status === 200) {
        throw new Error("workoutexercise not found")
      }
      const data = response.data
      return [null, data]
    } catch (error) {
      return [error.message, []]
    }
  }
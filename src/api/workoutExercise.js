import { Repartition, WorkOutlined } from "@mui/icons-material"
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

export const postWorkoutExercise = async (token, exerciseId, workoutId) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/workoutexercise`, {
      headers: { Authorization: `Bearer  ${token}` },
      set: 3,
      repetition: 10,
      exerciseId: exerciseId,
      workoutId: workoutId,
    })
    if (!response.status == "200") {
      throw new Error(response.error)
    }
    const data = response.data
    return [null, data]
  } catch (e) {
    return [e.message, []]
  }
}

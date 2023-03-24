import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getExercises = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/exercises`)
  try {
    if (!response.status === 200) {
      throw new Error("Exercises not found")
    }
    const data = response.data
    return [null, data]
  } catch (error) {
    return [error.message, []]
  }
}

export const getExerciseByUrl = async (url) => {
  const response = await axios.get(`${apiUrl}/${url}`)
  try {
    if (!response.status === 200) {
      throw new Error("exercise not found")
    }
    const data = response.data
    return [null, data]
  } catch (error) {
    return [error.message, []]
  }
}
export const createExercise = async (token, exercise) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/exercise`, {
      headers: { Authorization: `Bearer  ${token}` },
      name: exercise.name,
      description: exercise.description,
      targetMuscleGroup: exercise.targetMuscleGroup,
      imageLink: exercise.imageLink,
      videoLink: exercise.videoLink,
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

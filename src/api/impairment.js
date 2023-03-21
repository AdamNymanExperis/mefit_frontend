import axios from "."
const apiUrl = process.env.REACT_APP_API_URL

export const getImpairmentFromURL = async (impairmentURL) => {
  const response = await axios.get(`${apiUrl}/${impairmentURL}`)
  try {
    if (!response.status == 200) {
      throw new Error("Impairment not found")
    }
    const data = response.data
    return [null, data]
  } catch (error) {
    return [error.message, []]
  }
}

export const getImpairments = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/impairments`)
  try {
    if (!response.status == 200) {
      throw new Error("Impairment not found")
    }
    const data = response.data
    return [null, data]
  } catch (error) {
    return [error.message, []]
  }
}

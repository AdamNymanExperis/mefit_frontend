const apiUrl = process.env.REACT_APP_API_URL

export const getExercises = async (token) => {
    const response = await fetch(`${apiUrl}/exercises`, {
      headers: { Authorization: `Bearer  ${token}` },
    })
    try {
      if (!response.ok) {
        throw new Error("User not found")
      }
      const data = await response.json()
      return [null, data]
    } catch (error) {
      return [error.message, []]
    }
  }
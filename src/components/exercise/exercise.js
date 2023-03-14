import { getExercises } from "../../api/exercise";
import keycloak from "../../keycloak"
import { useEffect } from "react";

const Exercise = () => {

    useEffect( () => {
        const pingBackend = async() => {
          const data = await getExercises(keycloak.token) 
          console.log(data)
        }
        pingBackend()
      }, [])

    const message = "test"
    
    return <p>{message}</p>;
}
  
export default Exercise;
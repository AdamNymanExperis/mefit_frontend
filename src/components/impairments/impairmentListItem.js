import { useEffect, useState } from "react";
import { getImpairmentFromURL } from "../../api/impairment";

const ImpairmentListItem = ({impairmentURL}) => {
    const [impairment, setImpairment] = useState({})
    useEffect( () => {
      const callApiForImpairment = async() => {
        const data = await getImpairmentFromURL(impairmentURL) 
        setImpairment(data[1])
      }
      callApiForImpairment()
    }, [])
    
    return <li>{impairment.name}</li> 
  }
    
  export default ImpairmentListItem;
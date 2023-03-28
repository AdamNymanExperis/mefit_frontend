import { useEffect, useState } from "react"
import { getImpairmentFromURL } from "../../api/impairment"
import { ListItem, ListItemIcon } from "@mui/material"
import { Accessible } from "@mui/icons-material"

const ImpairmentListItem = ({ impairmentURL }) => {
  const [impairment, setImpairment] = useState({})
  useEffect(() => {
    const callApiForImpairment = async () => {
      const data = await getImpairmentFromURL(impairmentURL)
      setImpairment(data[1])
    }
    callApiForImpairment()
  }, [])

  return <ListItem sx={{marginBottom:"6px", color: "white", backgroundColor: "#2196f3"}}>
    <ListItemIcon>
      <Accessible sx={{color: "white"}}/>
    </ListItemIcon>
    {impairment.name}
    </ListItem>
}

export default ImpairmentListItem

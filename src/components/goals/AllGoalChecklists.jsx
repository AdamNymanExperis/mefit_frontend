import { useEffect, useState } from "react";
import { getGoalsByProfileId } from "../../api/goal";
import { Stack, Checkbox } from '@mui/material';

const AllGoalChecklists = () => {

  const [goal, setGoals] = useState([])
    
  useEffect( () => {
    const callApiForGoals = async() => {
      const data = await getGoalsByProfileId(1) 
      setGoals(data[1])
    }
    callApiForGoals()
  }, [])
    
  return <Stack direction="row">
      <p>here</p>
      <Checkbox
      checked={goal.achieved}
        
      />
      <p>{goal.achieved}</p>
  </Stack>
}

  //onChange={}
    
export default AllGoalChecklists;
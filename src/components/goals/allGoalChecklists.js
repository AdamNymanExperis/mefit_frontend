import { useEffect, useState } from "react";
import { getGoals } from "../../api/goal";
import { Stack, Checkbox } from '@mui/material';
import { GoalChecklist } from "./goalChecklist"

const AllGoalChecklists = () => {

  const [goal, setGoals] = useState({})
    
  useEffect( () => {
    const callApiForGoals = async() => {
      const data = await getGoals() 
      console.log(data[1].achieved)
      setGoals(data[1])
    }
    callApiForGoals()
  }, [])
    
  return <Stack direction="row">
    <GoalChecklist/>
      <p>here</p>
      <Checkbox
      checked={goal.achieved}
        
      />
      <p>{goal.achieved}</p>
  </Stack>
}

  //onChange={}
    
export default AllGoalChecklists;
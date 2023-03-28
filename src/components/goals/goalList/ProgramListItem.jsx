import { useEffect, useState } from "react";
import { List } from "@mui/material"
import { getProgramGoalByUrl } from "../../../api/programGoal";
import { getProgramByUrl } from "../../../api/program";
import WorkoutListItem from "./WorkoutListItem"

const ProgramListItem = ({programGoalUrl, setAchieved}) => {
    const [program, setProgram] = useState({})

    useEffect( () => {
        const callApiForProgram = async() => {
          const ProgramGoalData = await getProgramGoalByUrl(programGoalUrl) 
          const programData = await getProgramByUrl(ProgramGoalData[1].fitnessProgram)
          setProgram(programData[1])
        }
        callApiForProgram()
      }, [])

    return <><span>{program.name}:</span>
      <List component="div" disablePadding>
        {program.workouts?.map(
          (workout, index) => {
            return <WorkoutListItem key={index} workoutUrl={workout} setAchieved={setAchieved}/>
          }
        )}
      </List>
    </>
  }
    
  export default ProgramListItem;
import {useState, useEffect} from "react"
import { getGoalById } from "../../../api/goal"
import WorkoutEditorCard from "./WorkoutEditorCard"
import GoalEditorCard from "./GoalEditorCard"

function GoalEditorController() {
    const [activeEditorCard, setActiveEditorCard] = useState("goalEditor")
    
    const goalIndex = window.location.href.split('=')[1]
    const [goal, setGoal] = useState()
    

    useEffect( () => {
      const callApiForGoal = async(id) => {
        const data = await getGoalById(id) 
        setGoal(data[1])
      }
      callApiForGoal(goalIndex)
    }, [])


    return(
    <>
        {activeEditorCard === "goalEditor" && (
            <GoalEditorCard goal={goal} setGoal={setGoal} setActiveEditorCard={setActiveEditorCard}/>
        )}
  
        {activeEditorCard === "workoutEditor" && (
            <WorkoutEditorCard goal={goal} setGoal={setGoal} setActiveEditorCard={setActiveEditorCard}/>
        )}
  
        {activeEditorCard === "programEditor" && (
            <p>program</p>
        )}
    </>
    )  
}
export default GoalEditorController;
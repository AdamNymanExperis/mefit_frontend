import { useEffect, useState } from "react";
import { getWorkoutGoalByUrl } from "../../api/workoutgoal";
import { getWorkoutByUrl } from "../../api/workout";
import WorkoutToExerciseAdapter from "./WorkoutToExerciseAdapter"
import WorkoutEditorItem from "./WorkoutEditorItem"
import ProgramEditorItem from "./ProgramEditorItem";
import { getProgramByUrl } from "../../api/program";
import { getProgramGoalByUrl } from "../../api/programGoal";

const GoalToProgramEditorItemAdapter = ({programGoalUrl, goal, setGoal, setProgramGoals, index, inGoal}) => {
    const [program, setWorkout] = useState()

    useEffect( () => {
      const callApi = async(url) => {
        const programGoalData = await getProgramGoalByUrl(url) 
        const programData = await getProgramByUrl(programGoalData[1].fitnessProgram)
        setWorkout(programData[1])
      }
      callApi(programGoalUrl)
    }, [programGoalUrl])

    if(program === undefined) return <p>loading...</p>
    return <ProgramEditorItem programObject={program} goal={goal} setGoal={setGoal} setProgramGoals={setProgramGoals} inGoal={inGoal} index={index} />
}
    
export default GoalToProgramEditorItemAdapter;
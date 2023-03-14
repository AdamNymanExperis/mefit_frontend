import { getExercises } from "../../api/exercise";
import { useEffect, useState } from "react";
import ImpairmentListItem from "../impairments/impairmentListItem";

const ExerciseList = () => {

  const [exercises, setExercises] = useState([])
  useEffect( () => {
    const callApiForExercises = async() => {
      const data = await getExercises() 
      setExercises(data[1])
    }
    callApiForExercises()
  }, [])
  
  const [selected, setSelected] = useState(null);

  return <div>
    <div>{exercises.map((exercise, index) => (
      <div key={index}>
        <div onClick={() => setSelected(index)}>
          <p>{exercise.name}</p>
          <p>Target Muscle Group: {exercise.targetMuscleGroup}</p>

          { selected == index &&
            <div>
              <p>{exercise.description}</p>
              { exercise.impairments.length > 0 && 
                <p>This exercise could generally also be practised by people with the following impairments:</p>
              }
              <ul>{exercise.impairments.map((impairment, index) => (
                <ImpairmentListItem key={index} impairmentURL={impairment}/> 
              ))}</ul>
              <p>{exercise.videoLink}</p>
            </div>
          }
        </div>
      </div>
    ))}</div>      
  </div> 
}

/*{ selected == index ?
          <div>
            <p>{exercise.name}</p>
            <p>Target Muscle Group: {exercise.targetMuscleGroup}</p>
            <p>{exercise.description}</p>
            <p>This exercise could generally also be done by people with the following impairments.</p>
            <ul>{exercise.impairments.map((impairment, index) => (
              <ImpairmentListItem key={index} impairmentURL={impairment}/> 
            ))}</ul>
            <p>{exercise.videoLink}</p>
          </div> : 
          <div onClick={() => setSelected(index)}>
            <p>{exercise.name}</p>
            <p>Target Muscle Group: {exercise.targetMuscleGroup}</p>
          </div>
        }*/ 

export default ExerciseList;
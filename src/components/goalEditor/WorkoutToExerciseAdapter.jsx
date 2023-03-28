import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import { getWorkoutExerciseByUrl } from "../../api/workoutExercise";
import ExerciseListItem from "./ExerciseListItem";

const WorkoutToExerciseAdapter = ({ url }) => {
	const [workoutExercise, setWorkoutExercise] = useState({});

	// fetches data from the connection table workoutExercise
	useEffect(() => {
		const callApiForWorkoutExercise = async () => {
			const workoutData = await getWorkoutExerciseByUrl(url);
			setWorkoutExercise(workoutData[1]);
		};
		callApiForWorkoutExercise();
	}, []);

	if (
		workoutExercise.exercise === undefined ||
		workoutExercise.exercise === null
	) {
		return <LinearProgress />;
	}
	return <ExerciseListItem exerciseUrl={workoutExercise.exercise} />;
};
export default WorkoutToExerciseAdapter;

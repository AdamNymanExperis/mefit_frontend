import { useEffect, useState } from "react";
import { getWorkoutGoalByUrl } from "../../api/workoutgoal";
import { getWorkoutByUrl } from "../../api/workout";
import WorkoutEditorItem from "./WorkoutEditorItem";
import { CircularProgress } from "@mui/material";

const GoalToWorkoutEditorItemAdapter = ({
	workoutGoalUrl,
	goal,
	setGoal,
	setWorkoutGoals,
	inGoal,
	index,
}) => {
	const [workout, setWorkout] = useState();

	// firstly fetches data from the connection table workoutGoal and then fetches workout
	useEffect(() => {
		const callApi = async (url) => {
			const workoutGoalData = await getWorkoutGoalByUrl(url);
			const workoutData = await getWorkoutByUrl(workoutGoalData[1].workout);
			setWorkout(workoutData[1]);
		};
		callApi(workoutGoalUrl);
	}, [workoutGoalUrl]);

	if (workout === undefined) return <CircularProgress />;
	return (
		<WorkoutEditorItem
			workoutObject={workout}
			goal={goal}
			setGoal={setGoal}
			setWorkoutGoals={setWorkoutGoals}
			inGoal={inGoal}
			index={index}
		/>
	);
};

export default GoalToWorkoutEditorItemAdapter;

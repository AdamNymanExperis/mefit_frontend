import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import { getWorkoutGoalByUrl } from "../../../api/workoutgoal";
import WorkoutListItem from "./WorkoutListItem";

const GoalToWorkoutAdapter = ({ workoutGoalUrl }) => {
	const [workoutGoal, setWorkoutGoal] = useState({});

	// fetches workoutGoals from the API
	useEffect(() => {
		const callApiForWorkoutGoal = async () => {
			const workoutData = await getWorkoutGoalByUrl(workoutGoalUrl);
			setWorkoutGoal(workoutData[1]);
		};
		callApiForWorkoutGoal();
	}, []);

	if (workoutGoal.workout === undefined || workoutGoal.workout === null) {
		return <LinearProgress />;
	}
	return <WorkoutListItem workoutUrl={workoutGoal.workout} />;
};
export default GoalToWorkoutAdapter;

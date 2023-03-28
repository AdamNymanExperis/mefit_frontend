import { useState, useEffect } from "react";
import { getGoalById } from "../../api/goal";
import WorkoutEditorCard from "./WorkoutEditorCard";
import GoalEditorCard from "./GoalEditorCard";
import ProgramEditorCard from "./ProgramEditorCard";

function GoalEditorController() {
	// gets the goal index from the URL
	const goalIndex = window.location.href.split("=")[1];
	// state of which view that is currently shown
	const [activeEditorCard, setActiveEditorCard] = useState("goalEditor");
	const [goal, setGoal] = useState();
	// tracks if a goal is achieved
	const [achieved, setAchieved] = useState();

	// fetches goal from api and set achieved and goal states
	useEffect(() => {
		const callApiForGoal = async (id) => {
			const data = await getGoalById(id);
			setGoal(data[1]);
			setAchieved(data[1].achieved);
		};
		callApiForGoal(goalIndex);
	}, []);

	return (
		<>
			{activeEditorCard === "goalEditor" && (
				<GoalEditorCard
					goal={goal}
					setGoal={setGoal}
					setActiveEditorCard={setActiveEditorCard}
					achievedFromController={achieved}
				/>
			)}

			{activeEditorCard === "workoutEditor" && (
				<WorkoutEditorCard
					goal={goal}
					setGoal={setGoal}
					setActiveEditorCard={setActiveEditorCard}
				/>
			)}

			{activeEditorCard === "programEditor" && (
				<ProgramEditorCard
					goal={goal}
					setGoal={setGoal}
					setActiveEditorCard={setActiveEditorCard}
				/>
			)}
		</>
	);
}
export default GoalEditorController;

import { useEffect, useState } from "react";
import {
	ListItemText,
	ListItemIcon,
	ListItemButton,
	Collapse,
	IconButton,
	LinearProgress,
} from "@mui/material";
import {
	ExpandLess,
	ExpandMore,
	FitnessCenter,
	Delete,
	Add,
} from "@mui/icons-material";
import WorkoutToExerciseAdapter from "./WorkoutToExerciseAdapter";
import keycloak from "../../keycloak";
import { createWorkoutGoal } from "../../api/workoutgoal";
import { deleteWorkoutGoalByUrl } from "../../api/workoutgoal";

const WorkoutEditorItem = ({
	workoutObject,
	goal,
	setGoal,
	setWorkoutGoals,
	inGoal,
	index,
}) => {
	const [workout, setWorkout] = useState();
	const [open, setOpen] = useState(false);

	// When a workout is clicked the collapse tag should open and reveal the exercises of that workout
	const handleClick = () => {
		setOpen(!open);
	};

	/* 
    when pressed the specific workout is removed from the goal,
    this is done by deleting the specific entry in the connection table workoutGoal */
	const handleDelete = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (index >= 0) {
			await deleteWorkoutGoalByUrl(goal.workoutGoals[index], keycloak.token);

			const tempGoal = goal;
			tempGoal.workoutGoals.splice(index, 1);

			setWorkoutGoals([...tempGoal.workoutGoals]);
			setGoal(tempGoal);
		}
	};

	/* 
    when pressed the specific workout that workout is added to the goal,
    this is done by adding a new entry in the connection table workoutGoal */
	const handleAdd = async (event) => {
		event.preventDefault();
		event.stopPropagation();

		const newWorkoutGoal = await createWorkoutGoal(
			goal,
			workoutObject,
			keycloak.token
		);
		const newWorkoutGoalString = "api/v1/workoutGoal/" + newWorkoutGoal[1].id;
		const tempGoal = goal;
		tempGoal.workoutGoals = [...goal.workoutGoals, newWorkoutGoalString];
		setWorkoutGoals(tempGoal.workoutGoals);
		setGoal(tempGoal);
	};

	useEffect(() => {
		setWorkout(workoutObject);
	}, [workoutObject]);

	if (workout === undefined) return <LinearProgress />;
	return (
		<>
			<ListItemButton
				onClick={handleClick}
				sx={{
					margin: "5px",
					background: "#2196F3",
					color: "white",
					"&:hover": {
						backgroundColor: "#1769AA",
					},
				}}
			>
				<ListItemIcon>
					<FitnessCenter sx={{ color: "white" }} />
				</ListItemIcon>
				<ListItemText primary={workout.name} />
				{inGoal ? (
					<IconButton aria-label="delete" onClick={handleDelete}>
						<Delete sx={{ color: "white" }} />
					</IconButton>
				) : (
					<>
						<IconButton aria-label="add" onClick={handleAdd}>
							<Add sx={{ color: "white" }} />
						</IconButton>
					</>
				)}

				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>

			<Collapse
				in={open}
				timeout="auto"
				unmountOnExit
				sx={{ borderColor: "#1769AA", padding: "10px" }}
			>
				{workout.workoutExercises?.length > 0 && <span>exercises:</span>}

				{workout.workoutExercises?.map((workoutExercise, index) => {
					return <WorkoutToExerciseAdapter key={index} url={workoutExercise} />;
				})}
			</Collapse>
		</>
	);
};

export default WorkoutEditorItem;

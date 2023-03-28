import {
	Grid,
	Paper,
	Checkbox,
	ListItemIcon,
	ListItem,
	CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import keycloak from "../../keycloak";
import { getWorkoutById, updateWorkoutData } from "../../api/workout";
import { getWorkoutExerciseByUrl } from "../../api/workoutExercise";
import { getExerciseByUrl } from "../../api/exercise";
import ExerciseListItem from "../exercises/ExerciseListItem";
import { FitnessCenter } from "@mui/icons-material";

function DisplayWorkoutCard() {
	const workoutIndex = window.location.href.split("=")[1];
	const [workout, setWorkout] = useState();
	const [exercises, setExercises] = useState();
	// Holds state of if the workout is complete
	const [complete, setComplete] = useState();
	// Holds state of which exercise that is currently selected
	const [selected, setSelected] = useState(null);

	/* 	
	Makes multiple requests to the api. firstly it fetch the data for the workout,
	followed by fetching data from the connection table of WorkoutExercise, 
	and lastly, it fetches data from for the exercises. 
		
	inparameter: workout id
	sets the State of exercises and complete
	*/
	useEffect(() => {
		const callApiForExercises = async (id) => {
			const workoutData = await getWorkoutById(id);
			setWorkout(workoutData[1]);
			const workoutExercisesPromise = Promise.all(
				workoutData[1].workoutExercises.map(
					async (workoutExerciseUrl, index) => {
						const workoutExerciseData = await getWorkoutExerciseByUrl(
							workoutExerciseUrl
						);
						return workoutExerciseData[1];
					}
				)
			);
			const workoutExercisesData = await Promise.resolve(
				workoutExercisesPromise
			);
			const exerciseUrls = [];
			workoutExercisesData.map((workoutExercise) => {
				exerciseUrls.push(workoutExercise.exercise);
			});
			const exercisesPromise = Promise.all(
				exerciseUrls.map(async (exerciseUrl) => {
					const exerciseData = await getExerciseByUrl(exerciseUrl);
					return exerciseData[1];
				})
			);
			const exercisesData = await Promise.resolve(exercisesPromise);
			setExercises(exercisesData);
			setComplete(workoutData[1].complete);
		};
		callApiForExercises(workoutIndex);
	}, []);

	/* sends a request to the API to update a workout when a workout is marked as complete or incomplete */
	useEffect(() => {
		const callApiToUpdateWorkout = async () => {
			await updateWorkoutData(
				keycloak.token,
				workout.id,
				workout.name,
				workout.type,
				complete
			);
		};
		callApiToUpdateWorkout();
	}, [complete]);

	if (workout === undefined || exercises === undefined)
		return <CircularProgress />;
	return (
		<Paper sx={{ marginTop: 10, background: "#E0E1E5" }}>
			<Grid container sx={{ padding: "5px" }}>
				<Grid item={true} xs={4}>
					<ListItem>
						<ListItemIcon>
							<FitnessCenter />
						</ListItemIcon>
						<p>{workout.name}</p>
					</ListItem>
				</Grid>
				<Grid item={true} xs={4}>
					<ListItem>
						<p>Type: {workout.type}</p>
					</ListItem>
				</Grid>
				<Grid item={true} xs={4}>
					<ListItem>
						<p>Workout is Complete:</p>{" "}
						<Checkbox
							checked={complete}
							onChange={(newValue) => setComplete(!complete)}
						/>
					</ListItem>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				{exercises.map((exercise, index) => (
					<ExerciseListItem
						key={index}
						exercise={exercise}
						index={index}
						selected={selected}
						setSelected={setSelected}
					/>
				))}
			</Grid>
		</Paper>
	);
}
export default DisplayWorkoutCard;

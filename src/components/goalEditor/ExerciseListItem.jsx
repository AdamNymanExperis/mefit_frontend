import { useEffect, useState } from "react";
import {
	ListItemIcon,
	ListItemButton,
	ListItemText,
	CircularProgress,
} from "@mui/material";
import { SportsFootball } from "@mui/icons-material";
import { getExerciseByUrl } from "../../api/exercise";

const WorkoutListItem = ({ exerciseUrl }) => {
	const [exercise, setExercise] = useState({});

	// fetches exercises from API and sets the exercise state
	useEffect(() => {
		const callApiForWorkout = async (url) => {
			const exerciseData = await getExerciseByUrl(url);
			setExercise(exerciseData[1]);
		};
		callApiForWorkout(exerciseUrl);
	}, []);

	if (exercise === undefined) {
		return <CircularProgress />;
	}
	return (
		<ListItemButton>
			<ListItemIcon>
				<SportsFootball />
			</ListItemIcon>
			<ListItemText primary={exercise.name} />
		</ListItemButton>
	);
};

export default WorkoutListItem;

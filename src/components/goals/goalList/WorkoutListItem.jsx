import { useEffect, useState } from "react";
import {
	ListItemIcon,
	ListItemButton,
	ListItemText,
	CircularProgress,
} from "@mui/material";
import { FitnessCenter } from "@mui/icons-material";
import { getWorkoutByUrl } from "../../../api/workout";
const domainUrl = process.env.REACT_APP_DOMAIN_URL;

const WorkoutListItem = ({ workoutUrl }) => {
	const [workout, setWorkout] = useState({});
	const [completed, setCompleted] = useState(false);

	// Fetches workout from API
	useEffect(() => {
		const callApiForWorkout = async () => {
			const workoutData = await getWorkoutByUrl(workoutUrl);
			setWorkout(workoutData[1]);
			setCompleted(workoutData[1].complete);
		};
		callApiForWorkout();
	}, []);

	if (workout === undefined) {
		return <CircularProgress />;
	}
	return (
		<ListItemButton
			sx={{
				pl: 4,
				backgroundColor: completed ? "#a7fa9d" : "#ff5c5c",
				borderRadius: "16px",
				"&:hover": { background: "#dbdbdb" },
			}}
			href={`${domainUrl}/displayworkout?workout=${workout.id}`} //onClick={handleClick}
		>
			<ListItemIcon>
				<FitnessCenter />
			</ListItemIcon>
			<ListItemText primary={workout.name} />
		</ListItemButton>
	);
};

export default WorkoutListItem;

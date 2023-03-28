import { getExercises } from "../../api/exercise";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ExerciseListItem from "./ExerciseListItem";

const ExerciseList = () => {
	const [exercises, setExercises] = useState([]);
	// State for which exercise that is currently selected
	const [selected, setSelected] = useState(null);

	// Fetches exercises from API
	useEffect(() => {
		const callApiForExercises = async () => {
			const data = await getExercises();
			setExercises(data[1]);
		};
		callApiForExercises();
	}, []);

	return (
		<>
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
		</>
	);
};

export default ExerciseList;

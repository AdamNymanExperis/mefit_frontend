import { useEffect, useState } from "react";
import { Grid, Paper, Button, List, CircularProgress } from "@mui/material";
import { getPrograms } from "../../api/program";
import ProgramEditorItem from "./ProgramEditorItem";
import GoalToProgramEditorItemAdapter from "./GoalToProgramEditorItemAdapter";

const ProgramEditorCard = ({ goal, setGoal, setActiveEditorCard }) => {
	const [programs, setPrograms] = useState();
	const [programGoals, setProgramGoals] = useState([]);

	// fetches the all programs from the API
	useEffect(() => {
		const CallApiForWorkouts = async () => {
			const data = await getPrograms();
			setPrograms(data[1]);
		};
		CallApiForWorkouts();

		setProgramGoals(goal.fitnessProgramGoals);
	}, []);

	const handleBack = () => {
		setActiveEditorCard("goalEditor");
	};

	if (programs === undefined) {
		return <CircularProgress />;
	}
	return (
		<Paper sx={{ marginTop: 10, background: "#E0E1E5" }}>
			<Grid container sx={{ padding: "5px" }}>
				<Grid item={true} xs={12}>
					<p>Goal Editor:</p>
				</Grid>
				<Grid item={true} xs={6}>
					<List>
						{programGoals.map((programGoal, index) => {
							return (
								<GoalToProgramEditorItemAdapter
									key={index}
									programGoalUrl={programGoal}
									goal={goal}
									setGoal={setGoal}
									setProgramGoals={setProgramGoals}
									index={index}
									inGoal={true}
								/>
							);
						})}
					</List>
				</Grid>
				<Grid item={true} xs={6}>
					<List>
						{programs.map((program, index) => {
							return (
								<ProgramEditorItem
									key={index}
									programObject={program}
									goal={goal}
									setGoal={setGoal}
									setProgramGoals={setProgramGoals}
									inGoal={false}
									index={-1}
								/>
							);
						})}
					</List>
				</Grid>
				<Grid item={true} xs={12}>
					<Button
						sx={{
							margin: "10px",
							background: "#2196F3",
							color: "white",
							"&:hover": {
								backgroundColor: "#1769AA",
							},
						}}
						onClick={handleBack}
					>
						Back
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default ProgramEditorCard;

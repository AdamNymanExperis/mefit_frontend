import {
	Grid,
	Paper,
	TextField,
	Button,
	Checkbox,
	CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import keycloak from "../../keycloak";
import { updateGoal } from "../../api/goal";
import dayjs from "dayjs";

function GoalEditorCard({
	goal,
	setGoal,
	setActiveEditorCard,
	achievedFromController,
}) {
	const [title, setTitle] = useState();
	// states holding the start and end dates of the goal
	const [start, setStart] = useState();
	const [end, setEnd] = useState();
	// states of if the goal is achieved or not
	const [achieved, setAchieved] = useState(false);

	//When clicking the save button the dates and achieve status should be updated in the database
	const handleSave = async () => {
		const tempGoal = goal;
		if (title === undefined) tempGoal.title = goal.title;
		else tempGoal.title = title;
		if (start === undefined) tempGoal.start = goal.start;
		else tempGoal.start = await handleDateFromDatepicker(start);
		if (end === undefined) tempGoal.end = goal.end;
		else tempGoal.end = await handleDateFromDatepicker(end);
		if (achieved === undefined) tempGoal.achieved = goal.achieved;
		else tempGoal.achieved = achieved;
		const data = await updateGoal(keycloak.token, tempGoal, goal.id);
		setGoal(tempGoal);
	};

	/* 
  A method that is used to adapt the date from the datepicker to a string on the wanted format:
  YYYY-MM-DD-T01:00:00 */
	const handleDateFromDatepicker = async (date) => {
		const resolvedDate = await Promise.resolve(date);
		const dateString = resolvedDate.toString();
		const dateArr = dateString.split(" ");

		const day = parseInt(dateArr[1]) + 1;
		let stringDay;
		if (day < 10) stringDay = "0" + day;
		else stringDay = day;

		const months = new Map();
		months.set("Jan", "01");
		months.set("Feb", "02");
		months.set("Mar", "03");
		months.set("Apr", "04");
		months.set("May", "05");
		months.set("Jun", "06");
		months.set("Jul", "07");
		months.set("Aug", "08");
		months.set("Sep", "09");
		months.set("Oct", "10");
		months.set("Nov", "11");
		months.set("Dec", "12");

		// returns a string at the format YYYY-MM-DD-T01:00:00
		const string = `${dateArr[3]}-${months.get(
			dateArr[2]
		)}-${stringDay}T01:00:00`;
		return string;
	};

	const handleProgram = () => {
		setActiveEditorCard("programEditor");
	};

	const handleWorkout = () => {
		setActiveEditorCard("workoutEditor");
	};

	if (goal === undefined || achievedFromController === undefined) {
		return <CircularProgress />;
	}
	return (
		<Paper sx={{ marginTop: 10, background: "#E0E1E5" }}>
			<Grid container sx={{ padding: "5px" }}>
				<Grid item={true} xs={12}>
					<p>Goal Editor:</p>
				</Grid>
				<Grid item={true} xs={4}>
					<TextField
						id="outlined-basic"
						label={goal.title}
						defaultValue={goal.title}
						variant="outlined"
						onChange={(newValue) => setTitle(newValue.target.value)}
					/>
				</Grid>
				<Grid item={true} xs={4}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							defaultValue={dayjs(goal.start.split("T")[0])}
							onChange={(newValue) => setStart(newValue)}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid item={true} xs={4}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							defaultValue={dayjs(goal.end.split("T")[0])}
							onChange={(newValue) => setEnd(newValue)}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid item={true} xs={12}>
					<span>Goal achieved: </span>
					<Checkbox
						checked={achieved}
						onChange={(newValue) => setAchieved(!achieved)}
					/>
				</Grid>
				<Grid item={true} xs={8}>
					<Button
						sx={{
							marginTop: "10px",
							background: "#2196F3",
							color: "white",
							"&:hover": {
								backgroundColor: "#1769AA",
							},
						}}
						onClick={handleSave}
					>
						Save
					</Button>
				</Grid>
				<Grid item={true} xs={2}>
					{goal.fitnessProgramGoals?.length <= 0 && (
						<Button
							sx={{
								marginTop: "10px",
								background: "#2196F3",
								color: "white",
								"&:hover": {
									backgroundColor: "#1769AA",
								},
							}}
							onClick={handleWorkout}
						>
							Workouts
						</Button>
					)}
				</Grid>
				<Grid item={true} xs={2}>
					{goal.workoutGoals?.length <= 0 && (
						<Button
							sx={{
								marginTop: "10px",
								background: "#2196F3",
								color: "white",
								"&:hover": {
									backgroundColor: "#1769AA",
								},
							}}
							onClick={handleProgram}
						>
							Program
						</Button>
					)}
				</Grid>
			</Grid>
		</Paper>
	);
}
export default GoalEditorCard;

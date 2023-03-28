import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ProgramEditorItem from "./ProgramEditorItem";
import { getProgramByUrl } from "../../api/program";
import { getProgramGoalByUrl } from "../../api/programGoal";

const GoalToProgramEditorItemAdapter = ({
	programGoalUrl,
	goal,
	setGoal,
	setProgramGoals,
	index,
	inGoal,
}) => {
	const [program, setProgram] = useState();

	// firstly fetches the connection table ProgramGoal and then fetches the program.
	useEffect(() => {
		const callApi = async (url) => {
			const programGoalData = await getProgramGoalByUrl(url);
			const programData = await getProgramByUrl(
				programGoalData[1].fitnessProgram
			);
			setProgram(programData[1]);
		};
		callApi(programGoalUrl);
	}, [programGoalUrl]);

	if (program === undefined) return <CircularProgress />;
	return (
		<ProgramEditorItem
			programObject={program}
			goal={goal}
			setGoal={setGoal}
			setProgramGoals={setProgramGoals}
			inGoal={inGoal}
			index={index}
		/>
	);
};

export default GoalToProgramEditorItemAdapter;

import keycloak from "../../keycloak";
import { Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getImpairments } from "../../api/impairment";
import { updateImpairmentsIntoProfile } from "../../api/profile";

function ImpairmentEdit(props) {
	//Local State
	const [impairmentRows, setImpairmentRows] = useState([]);
	const [currentImpairments, setCurrentImpairments] = useState([]);

	//Columns for the Datagrid
	const columns = [
		{ field: "Id", headerName: "ID", width: 90 },
		{ field: "name", headerName: "Name", width: 150 },
		{
			field: "description",
			headerName: "Description",
			width: 350,
		},
	];

	//save the impairment to profile
	const SaveImpairments = async (impairments) => {
		await updateImpairmentsIntoProfile(
			keycloak.token,
			keycloak.tokenParsed.sub,
			impairments
		);
		props.goBackToProfileAndUpdateData();
	};

	//side effect
	useEffect(() => {
		const callApiForImpairments = async () => {
			const [error, data] = await getImpairments();
			setImpairmentRows(data);
			if (error !== null) {
				props.setApiError(error);
			}
		};
		callApiForImpairments();
		setCurrentImpairments(
			props.userProfile.impairments.map((x) =>
				parseInt(x.substring(x.lastIndexOf("/") + 1))
			)
		);
	}, [props]);

	if (impairmentRows === undefined) return <CircularProgress />;
	return (
		<div>
			<Box sx={{ height: 400, width: "100%", marginTop: 10 }}>
				<DataGrid
					rows={impairmentRows}
					columns={columns}
					checkboxSelection
					disableRowSelectionOnClick
					rowSelectionModel={currentImpairments}
					onRowSelectionModelChange={(ids) => {
						setCurrentImpairments(ids);
					}}
				/>
			</Box>
			<Box
				component="span"
				m={1}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				sx={{ marginTop: 2 }}
			>
				<Button
					sx={{
						background: "#2196f3",
						color: "white",
						"&:hover": {
							backgroundColor: "#1769aa",
						},
					}}
					onClick={() => SaveImpairments(currentImpairments)}
				>
					Save
				</Button>

				<Button
					sx={{
						background: "#2196f3",
						color: "white",
						"&:hover": {
							backgroundColor: "#1769aa",
						},
					}}
					onClick={() => props.goBackToProfileAndUpdateData()}
				>
					Back
				</Button>
			</Box>
		</div>
	);
}
export default ImpairmentEdit;

import axios from ".";
const apiUrl = process.env.REACT_APP_API_URL;

export const getWorkoutByUrl = async (workoutUrl) => {
	const response = await axios.get(`${apiUrl}/${workoutUrl}`);
	try {
		if (!response.status === 200) {
			throw new Error("workout not found");
		}
		const data = response.data;
		return [null, data];
	} catch (error) {
		return [error.message, []];
	}
};

export const getWorkouts = async () => {
	const response = await axios.get(`${apiUrl}/api/v1/workouts`);
	try {
		if (!response.status === 200) {
			throw new Error("workouts not found");
		}
		const data = response.data;
		return [null, data];
	} catch (error) {
		return [error.message, []];
	}
};

export const getWorkoutById = async (workoutId) => {
	const response = await axios.get(`${apiUrl}/api/v1/workout/${workoutId}`);
	try {
		if (!response.status === 200) {
			throw new Error("workout not found");
		}
		const data = response.data;
		return [null, data];
	} catch (error) {
		return [error.message, []];
	}
};

export const createWorkout = async (token, workout) => {
	try {
		const response = await axios.post(`${apiUrl}/api/v1/workout`, {
			headers: { Authorization: `Bearer  ${token}` },
			name: workout.name,
			type: workout.type,
			complete: false,
		});
		if (!response.status == "200") {
			throw new Error(response.error);
		}
		const data = response.data;
		return [null, data];
	} catch (e) {
		return [e.message, []];
	}
};

export const updateExerciseIntoWorkout = async (
	token,
	workoutId,
	workoutexercise
) => {
	try {
		const response = await axios.put(
			`${apiUrl}/api/v1/workout/${workoutId}/exercise`,
			workoutexercise
		);
		if (!response.status === "200") {
			throw new Error(response.error);
		}
		return "success";
	} catch (e) {
		return e.message;
	}
};

export const updateWorkoutData = async (
	token,
	workoutId,
	name,
	type,
	complete
) => {
	try {
		const response = await axios.put(`${apiUrl}/api/v1/workout/${workoutId}`, {
			headers: { Authorization: `Bearer  ${token}` },
			id: workoutId,
			name: name,
			type: type,
			complete: complete,
		});
		if (!response.status === "200") {
			throw new Error(response.error);
		}
		return "success";
	} catch (e) {
		return e.message;
	}
};

import { createSlice } from '@reduxjs/toolkit';
import { fetchGetAreas } from '../thunks/getAreasThunk';

export const initialState = {
	areasList: [],
	isLoadingGetAreas: false,
	errorGetAreas: false,
	errorMessageGetAreas: '',
};

const getAreasSlice = createSlice({
	name: 'getAreas',
	initialState,
	reducers: {
		cleanAreasList: (state) => {
			state.areasList = [];
		},
		addPoint: (state, action) => {
			state.areasList = action.payload;
			console.log(action.payload);
			console.log(JSON.stringify(action.payload[0]));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetAreas.fulfilled, (state, action) => {
				state.areasList = action.payload;
				state.isLoadingGetAreas = false;
				state.errorGetAreas = false;
				console.log(action.payload);
			})
			.addCase(fetchGetAreas.pending, (state) => {
				state.areasList = [];
				state.isLoadingGetAreas = true;
				state.errorGetAreas = false;
			})
			.addCase(fetchGetAreas.rejected, (state, action) => {
				state.areasList = [];
				state.isLoadingGetAreas = false;
				state.errorGetAreas = true;
				state.errorMessageGetAreas =
					action.error.message || 'Произошла неизвестная ошибка';
			});
	},
});

export const { cleanAreasList, addPoint } = getAreasSlice.actions;

export default getAreasSlice.reducer;

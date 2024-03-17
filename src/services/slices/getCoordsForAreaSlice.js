import { createSlice } from '@reduxjs/toolkit';
import { fetchGetCoordsForArea } from '../thunks/getCoordsForAreaThunk';

export const initialState = {
	coordsForArea: [],
	isLoadingcoordsForArea: false,
	errorCoordsForArea: false,
	errorMessageCoordsForArea: '',
};

const getCoordsForAreaSliсe = createSlice({
	name: 'getCoordsForArea',
	initialState,
	reducers: {
		setCoordsForArea: (state, action) => {
			state.coordsForArea = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetCoordsForArea.fulfilled, (state, action) => {
				state.coordsForArea = action.payload;
				state.isLoadingcoordsForArea = false;
				state.errorCoordsForArea = false;
			})
			.addCase(fetchGetCoordsForArea.pending, (state) => {
				state.coordsForArea = [];
				state.isLoadingcoordsForArea = true;
				state.errorCoordsForArea = false;
			})
			.addCase(fetchGetCoordsForArea.rejected, (state, action) => {
				state.coordsForArea = [];
				state.isLoadingcoordsForArea = false;
				state.errorCoordsForArea = true;
				state.errorMessageGetAreas =
					action.error.message ||
					'Произошла неизвестная ошибка. Попробуйте повторить позже';
			});
	},
});

export const { setCoordsForArea } = getCoordsForAreaSliсe.actions;
export default getCoordsForAreaSliсe.reducer;

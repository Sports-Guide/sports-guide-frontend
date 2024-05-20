import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGetCoordsForArea } from '../thunks/getCoordsForAreaThunk';
import { TCoordsForAreaState } from '../../utils/types';

const initialState: TCoordsForAreaState = {
	coordsForArea: [],
	isLoadingcoordsForArea: false,
	errorCoordsForArea: false,
	errorMessageCoordsForArea: '',
};

const getCoordsForAreaSlice = createSlice({
	name: 'getCoordsForArea',
	initialState,
	reducers: {
		setCoordsForArea: (state, action: PayloadAction<number[][]>) => {
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
				state.errorMessageCoordsForArea =
					action.error.message ||
					'Произошла неизвестная ошибка. Попробуйте повторить позже';
			});
	},
});

export const { setCoordsForArea } = getCoordsForAreaSlice.actions;
export default getCoordsForAreaSlice.reducer;

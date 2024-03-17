import { createSlice } from '@reduxjs/toolkit';
import { fetchAddArea } from '../thunks/addAreaThunk';

export const initialState = {
	address: '',
	coordinates: [],
	areasToShow: [],
	isAreaAdded: false,
	isAreaLoading: false,
	isAreaError: false,
	errorMessageAddArea: 'Произошла неизвестная ошибка',
};

const areaSlice = createSlice({
	name: 'area',
	initialState,
	reducers: {
		setAddress: (state, action) => {
			state.address = action.payload;
		},
		setCoordinates: (state, action) => {
			state.coordinates = action.payload;
		},
		setAreasToShow: (state, action) => {
			state.areasToShow = action.payload;
		},
		setIsAreaAdded: (state, action) => {
			state.isAreaAdded = action.payload;
		},
		setIsAreaError: (state, action) => {
			state.isAreaError = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAddArea.fulfilled, (state) => {
				state.isAreaAdded = true;
				state.isAreaLoading = false;
				state.isAreaError = false;
			})
			.addCase(fetchAddArea.pending, (state) => {
				state.isAreaAdded = false;
				state.isAreaLoading = true;
				state.isAreaError = false;
			})
			.addCase(fetchAddArea.rejected, (state, action) => {
				state.isAreaAdded = false;
				state.isAreaLoading = false;
				state.isAreaError = true;
				state.errorMessageAddArea =
					action.error.message ||
					'Произошла неизвестная ошибка. Попробуйте повторить позже';
			});
	},
});

export const {
	setAddress,
	setCoordinates,
	setAreasToShow,
	setIsAreaAdded,
	setIsAreaError,
} = areaSlice.actions;
export default areaSlice.reducer;

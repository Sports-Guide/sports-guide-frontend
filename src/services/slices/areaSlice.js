import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	address: '',
	coordinates: [],
	areasToShow: [],
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
	},
});

export const { setAddress, setCoordinates, setAreasToShow } = areaSlice.actions;
export default areaSlice.reducer;

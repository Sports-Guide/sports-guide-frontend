import { createSlice } from '@reduxjs/toolkit';
import {
	fetchAddArea,
	fetchGetAreas,
	fetchGetCategory,
	fetchGetAreaComments,
} from '../thunks/areasThunk';

export const initialState = {
	address: '',
	coordinates: [],
	areasToShow: [],
	isAreaAdded: false,
	isAreaLoading: false,
	isAreaError: false,
	errorMessageAddArea: 'Произошла неизвестная ошибка',
	areasList: [],
	isLoadingGetAreas: false,
	errorGetAreas: false,
	errorMessageGetAreas: '',
	categoryList: [],
	isLoadingGetCategory: false,
	errorGetCategory: false,
	errorMessageGetCategory: '',
	// при добавлении площадки, она сперва проверяется модератором и только после - добавляется в базу
	isVerified: false,
	areaInfo: null,
	isLoadingAreaInfo: false,
	errorAreaInfo: false,
	errorMessageAreaInfo: '',
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
			})
			.addCase(fetchGetAreas.fulfilled, (state, action) => {
				state.areasList = action.payload;
				state.isLoadingGetAreas = false;
				state.errorGetAreas = false;
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
					action.error.message ||
					'Произошла неизвестная ошибка. Попробуйте повторить позже';
			})
			.addCase(fetchGetCategory.fulfilled, (state, action) => {
				state.categoryList = action.payload;
				state.isLoadingGetCategory = false;
				state.errorGetCategory = false;
			})
			.addCase(fetchGetCategory.pending, (state) => {
				state.categoryList = [];
				state.isLoadingGetCategory = true;
				state.errorGetCategory = false;
			})
			.addCase(fetchGetCategory.rejected, (state, action) => {
				state.categoryList = [];
				state.isLoadingGetCategory = false;
				state.errorGetCategory = true;
				state.errorMessageGetCategory =
					action.error.message || 'Произошла неизвестная ошибка';
			})
			.addCase(fetchGetAreaComments.fulfilled, (state, action) => {
				state.areaInfo = action.payload;
				state.isLoadingAreaInfo = false;
				state.errorAreaInfo = false;
			})
			.addCase(fetchGetAreaComments.pending, (state) => {
				state.isLoadingAreaInfo = true;
				state.errorAreaInfo = false;
			})
			.addCase(fetchGetAreaComments.rejected, (state, action) => {
				state.areaInfo = null;
				state.isLoadingAreaInfo = false;
				state.errorAreaInfo = true;
				state.errorMessageAreaInfo =
					action.error.message || 'Произошла неизвестная ошибка';
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

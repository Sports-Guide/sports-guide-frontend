import { createSlice } from '@reduxjs/toolkit';
import { fetchGetCategory } from '../thunks/getCategoryThunk';

export const initialState = {
	categoryList: [],
	isLoadingGetCategory: false,
	errorGetCategory: false,
	errorMessageGetCategory: '',
};

const getCategorySlice = createSlice({
	name: 'getCategory',
	initialState,
	extraReducers: (builder) => {
		builder
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
			});
	},
});

export default getCategorySlice.reducer;

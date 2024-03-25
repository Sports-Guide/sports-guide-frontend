import { createSlice } from '@reduxjs/toolkit';
import {
	fetchGetFavoriteAreas,
	fetchAddAreaToFavorite,
	fetchDeleteAreaFromFavorite,
} from '../thunks/favoriteAreasThunk';

export const initialState = {
	favoriteAreasList: [],
	isLoadingGetFavoriteAreas: false,
	errorGetFavoriteAreas: false,
	errorMessageFavoriteAreas: '',
	isLoadingAddToFavoriteAreas: false,
	errorAddToFavoriteAreas: false,
	isLoadingDeleteFromFavoriteAreas: false,
	errorDeleteFromFavoriteAreas: false,
};

const favoriteAreasSlice = createSlice({
	name: 'favoriteAreas',
	initialState,
	// reducers: {
	// },
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetFavoriteAreas.fulfilled, (state, action) => {
				state.favoriteAreasList = action.payload;
				state.isLoadingGetFavoriteAreas = false;
				state.errorGetFavoriteAreas = false;
			})
			.addCase(fetchGetFavoriteAreas.pending, (state) => {
				state.favoriteAreasList = [];
				state.isLoadingGetFavoriteAreas = true;
				state.errorGetFavoriteAreas = false;
			})
			.addCase(fetchGetFavoriteAreas.rejected, (state, action) => {
				state.favoriteAreasList = [];
				state.isLoadingGetFavoriteAreas = false;
				state.errorGetFavoriteAreas = true;
				state.errorMessageFavoriteAreas =
					action.error.message || 'Произошла неизвестная ошибка';
			})
			.addCase(fetchAddAreaToFavorite.fulfilled, (state, action) => {
				state.favoriteAreasList.push(action.payload);
				state.isLoadingAddToFavoriteAreas = false;
				state.errorAddToFavoriteAreas = false;
			})
			.addCase(fetchAddAreaToFavorite.pending, (state) => {
				state.isLoadingAddToFavoriteAreas = true;
				state.errorAddToFavoriteAreas = false;
			})
			.addCase(fetchAddAreaToFavorite.rejected, (state, action) => {
				state.isLoadingAddToFavoriteAreas = false;
				state.errorAddToFavoriteAreas = true;
				state.errorMessageFavoriteAreas =
					action.error.message || 'Произошла неизвестная ошибка';
			})
			.addCase(fetchDeleteAreaFromFavorite.fulfilled, (state, action) => {
				state.favoriteAreasList = state.favoriteAreasList.filter(
					(area) => area.id !== action.payload.id
				);
				state.isLoadingDeleteFromFavoriteAreas = false;
				state.errorDeleteFromFavoriteAreas = false;
			})
			.addCase(fetchDeleteAreaFromFavorite.pending, (state) => {
				state.isLoadingDeleteFromFavoriteAreas = true;
				state.errorDeleteFromFavoriteAreas = false;
			})
			.addCase(fetchDeleteAreaFromFavorite.rejected, (state, action) => {
				state.isLoadingDeleteFromFavoriteAreas = false;
				state.errorDeleteFromFavoriteAreas = true;
				state.errorMessageFavoriteAreas =
					action.error.message || 'Произошла неизвестная ошибка';
			});
	},
});

// export const { setFavoriteAreas, removeAreaFromFavorites } =
// 	favoriteAreasSlice.actions;
export default favoriteAreasSlice.reducer;

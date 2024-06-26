import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchGetFavoriteAreas,
	fetchAddAreaToFavorite,
	fetchDeleteAreaFromFavorite,
	fetchGetMyAreas,
} from '../thunks/favoriteAreasThunk';
import {
	TFavoriteAreaState,
	SportGround,
	SportGrounds,
} from '../../utils/types';

export const initialState: TFavoriteAreaState = {
	favoriteAreasList: [],
	isLoadingGetFavoriteAreas: false,
	errorGetFavoriteAreas: false,
	errorMessageFavoriteAreas: '',
	isLoadingAddToFavoriteAreas: false,
	errorAddToFavoriteAreas: false,
	isLoadingDeleteFromFavoriteAreas: false,
	errorDeleteFromFavoriteAreas: false,
	myAreasList: [],
	isLoadingGetMyAreas: false,
	errorGetMyAreas: false,
	errorMessageMyAreas: '',
};

const favoriteAreasSlice = createSlice({
	name: 'favoriteAreas',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchGetFavoriteAreas.fulfilled,
				(state, action: PayloadAction<SportGrounds>) => {
					state.favoriteAreasList = action.payload;
					state.isLoadingGetFavoriteAreas = false;
					state.errorGetFavoriteAreas = false;
				}
			)
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
			.addCase(
				fetchAddAreaToFavorite.fulfilled,
				(state, action: PayloadAction<SportGround>) => {
					state.favoriteAreasList.push(action.payload);
					state.isLoadingAddToFavoriteAreas = false;
					state.errorAddToFavoriteAreas = false;
				}
			)
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
			.addCase(
				fetchDeleteAreaFromFavorite.fulfilled,
				(state, action: PayloadAction<SportGround>) => {
					state.favoriteAreasList = state.favoriteAreasList.filter(
						(area) => area.id !== action.payload.id
					);
					state.isLoadingDeleteFromFavoriteAreas = false;
					state.errorDeleteFromFavoriteAreas = false;
				}
			)
			.addCase(fetchDeleteAreaFromFavorite.pending, (state) => {
				state.isLoadingDeleteFromFavoriteAreas = true;
				state.errorDeleteFromFavoriteAreas = false;
			})
			.addCase(fetchDeleteAreaFromFavorite.rejected, (state, action) => {
				state.isLoadingDeleteFromFavoriteAreas = false;
				state.errorDeleteFromFavoriteAreas = true;
				state.errorMessageFavoriteAreas =
					action.error.message || 'Произошла неизвестная ошибка';
			})
			.addCase(
				fetchGetMyAreas.fulfilled,
				(state, action: PayloadAction<SportGrounds>) => {
					state.myAreasList = action.payload;
					state.isLoadingGetMyAreas = false;
					state.errorGetMyAreas = false;
				}
			)
			.addCase(fetchGetMyAreas.pending, (state) => {
				state.myAreasList = [];
				state.isLoadingGetMyAreas = true;
				state.errorGetMyAreas = false;
			})
			.addCase(fetchGetMyAreas.rejected, (state, action) => {
				state.myAreasList = [];
				state.isLoadingGetMyAreas = false;
				state.errorGetMyAreas = true;
				state.errorMessageMyAreas =
					action.error.message || 'Произошла ошибка загрузки моих площадок';
			});
	},
});

// export const { setFavoriteAreas, removeAreaFromFavorites } =
// 	favoriteAreasSlice.actions;
export default favoriteAreasSlice.reducer;

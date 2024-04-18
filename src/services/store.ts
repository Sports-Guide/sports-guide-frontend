import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import registerUserSlice from './slices/registerUserSliсe';
import modalSlice from './slices/modalSlice';
import resetPasswordSliсe from './slices/resetPasswordSliсe';
import areaSlice from './slices/areaSlice';
import getCoordsForAreaSlice from './slices/getCoordsForAreaSlice';
import favoriteAreasSlice from './slices/favoriteAreasSlice';

const rootReducer = combineReducers({
	user: userSlice,
	registerUser: registerUserSlice,
	modal: modalSlice,
	resetPassword: resetPasswordSliсe,
	area: areaSlice,
	getCoordsForArea: getCoordsForAreaSlice,
	favoriteAreas: favoriteAreasSlice,
});

export const store = configureStore({
	reducer: rootReducer,
});

// Тип для корневого состояния
export type RootState = ReturnType<typeof store.getState>;

// Тип для диспетчера
export type AppDispatch = typeof store.dispatch;

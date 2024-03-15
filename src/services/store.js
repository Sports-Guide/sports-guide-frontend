import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import registerUserSlice from './slices/registerUserSliсe';
import modalSlice from './slices/modalSlice';
import resetPasswordSliсe from './slices/resetPasswordSliсe';
import getAreasSlice from './slices/getAreasSlice';
import getCategorySlice from './slices/getCategorySlice';
import areaSlice from './slices/areaSlice';
import getCoordsForAreaSlice from './slices/getCoordsForAreaSlice';

const rootReducer = combineReducers({
	user: userSlice,
	registerUser: registerUserSlice,
	modal: modalSlice,
	resetPassword: resetPasswordSliсe,
	getAreas: getAreasSlice,
	getCategory: getCategorySlice,
	area: areaSlice,
	getCoordsForArea: getCoordsForAreaSlice,
});

export const store = configureStore({
	reducer: rootReducer,
});

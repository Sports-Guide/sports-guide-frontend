import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import registerUserSlice from './slices/registerUserSliсe';
import modalSlice from './slices/modalSlice';
import getAreasSlice from './slices/getAreasSlice';

const rootReducer = combineReducers({
	user: userSlice,
	registerUser: registerUserSlice,
	modal: modalSlice,
	getAreas: getAreasSlice,
});

export const store = configureStore({
	reducer: rootReducer,
});

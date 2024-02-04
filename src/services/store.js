import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import registerUserSlice from './slices/registerUserSliсe';
import modalSlice from './slices/modalSlice';

const rootReducer = combineReducers({
	user: userSlice,
	registerUser: registerUserSlice,
	modal: modalSlice,
});

export const store = configureStore({
	reducer: rootReducer,
});

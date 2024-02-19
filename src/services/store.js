import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import registerUserSlice from './slices/registerUserSliсe';
import modalSlice from './slices/modalSlice';
import resetPasswordSliсe from './slices/resetPasswordSliсe';

const rootReducer = combineReducers({
	user: userSlice,
	registerUser: registerUserSlice,
	modal: modalSlice,
	resetPassword: resetPasswordSliсe,
});

export const store = configureStore({
	reducer: rootReducer,
});

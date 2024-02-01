import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlise from './slices/userSlice';
import registerUserSlise from './slices/registerUserSliсe';

const rootReducer = combineReducers({
	user: userSlise,
	registerUser: registerUserSlise,
});

export const store = configureStore({
	reducer: rootReducer,
});

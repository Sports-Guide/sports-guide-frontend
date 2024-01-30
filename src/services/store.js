import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authUserSlise from './slices/userSlice';
import registerUserSlise from './slices/registerUserSliсe';

const rootReducer = combineReducers({
	authUser: authUserSlise,
	registerUser: registerUserSlise,
});

export const store = configureStore({
	reducer: rootReducer,
});

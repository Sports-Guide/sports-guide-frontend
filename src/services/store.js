import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authUserSlise from './slices/userSlice';

const rootReducer = combineReducers({
	authUser: authUserSlise,
});

export const store = configureStore({
	reducer: rootReducer,
});

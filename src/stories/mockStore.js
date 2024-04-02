import { configureStore } from '@reduxjs/toolkit';
import userReducer from './mockSlice';

export const createMockStore = (preloadedState) =>
	configureStore({
		reducer: {
			user: userReducer,
		},
		preloadedState,
	});

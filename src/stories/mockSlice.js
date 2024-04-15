import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isUserAuth: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state) => {
			state.isUserAuth = true;
		},
		logout: (state) => {
			state.isUserAuth = false;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

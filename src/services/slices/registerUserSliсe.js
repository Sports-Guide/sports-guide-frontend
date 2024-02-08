import { createSlice } from '@reduxjs/toolkit';
import {
	fetchRegister,
	fetchUserActivation,
} from '../thunks/registerUserThunk';

export const initialState = {
	// register
	email: '',
	isRegister: false,
	isLoadingRegister: false,
	errorRegister: false,
	errorMessageRegister: '',
	// user activation
	isUserActivation: false,
	isLoadingUserActivation: false,
	errorUserActivation: false,
	errorMessageUserActivation: '',
};

const registerUserSlice = createSlice({
	name: 'registerUser',
	initialState,
	reducers: {
		setIsRegister: (state) => {
			state.isRegister = false;
		},
		clearRegisterError: (state) => {
			state.errorRegister = false;
			state.errorMessageRegister = '';
		},
	},
	extraReducers: (builder) => {
		builder
			// register
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.email = action.payload;
				state.isRegister = true;
				state.isLoadingRegister = false;
				state.errorRegister = false;
			})
			.addCase(fetchRegister.pending, (state) => {
				state.isRegister = false;
				state.isLoadingRegister = true;
				state.errorRegister = false;
			})
			.addCase(fetchRegister.rejected, (state, action) => {
				state.isRegister = false;
				state.isLoadingRegister = false;
				state.errorRegister = true;
				state.errorMessageRegister =
					action.error.message || 'Произошла неизвестная ошибка';
			})
			// user activation
			.addCase(fetchUserActivation.fulfilled, (state) => {
				state.isUserActivation = true;
				state.isLoadingUserActivation = false;
				state.errorMessageUserActivation = false;
			})
			.addCase(fetchUserActivation.pending, (state) => {
				state.isUserActivation = false;
				state.isLoadingUserActivation = true;
				state.errorMessageUserActivation = false;
			})
			.addCase(fetchUserActivation.rejected, (state, action) => {
				state.isUserActivation = false;
				state.isLoadingUserActivation = false;
				state.errorRegister = true;
				state.errorMessageUserActivation =
					action.error.message || 'Произошла неизвестная ошибка';
			});
	},
});

export const { setIsRegister, clearRegisterError } = registerUserSlice.actions;
export default registerUserSlice.reducer;

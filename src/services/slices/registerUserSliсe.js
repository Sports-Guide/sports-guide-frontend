import { createSlice } from '@reduxjs/toolkit';
import {
	fetchRegister,
	fetchResendActivation,
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
	// user resend activation
	isResendActivation: false,
	isLoadingResendActivation: false,
	errorResendActivation: false,
	errorMessageResendActivation: '',
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
		setIsResendActivation: (state) => {
			state.isResendActivation = false;
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
				state.errorUserActivation = false;
			})
			.addCase(fetchUserActivation.pending, (state) => {
				state.isUserActivation = false;
				state.isLoadingUserActivation = true;
				state.errorUserActivation = false;
			})
			.addCase(fetchUserActivation.rejected, (state, action) => {
				state.isUserActivation = false;
				state.isLoadingUserActivation = false;
				state.errorUserActivation = true;
				state.errorMessageUserActivation =
					action.error.message || 'Произошла неизвестная ошибка';
			})
			// user resend activation
			.addCase(fetchResendActivation.fulfilled, (state, action) => {
				state.email = action.payload;
				state.isResendActivation = true;
				state.isLoadingResendActivation = false;
				state.errorResendActivation = false;
				console.log(action.payload);
			})
			.addCase(fetchResendActivation.pending, (state) => {
				state.isResendActivation = false;
				state.isLoadingResendActivation = true;
				state.errorResendActivation = false;
			})
			.addCase(fetchResendActivation.rejected, (state, action) => {
				state.isResendActivation = false;
				state.isLoadingResendActivation = false;
				state.errorResendActivation = true;
				state.errorMessageResendActivation =
					action.error.message || 'Произошла неизвестная ошибка';
			});
	},
});

export const { setIsRegister, clearRegisterError, setIsResendActivation } =
	registerUserSlice.actions;
export default registerUserSlice.reducer;

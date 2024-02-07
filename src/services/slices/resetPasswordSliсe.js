import { createSlice } from '@reduxjs/toolkit';
import {
	fetchConfirmPasswordReset,
	fetchInitiatingPasswordReset,
} from '../thunks/resetPasswordThunk';

export const initialState = {
	// initiating password reset
	email: '',
	isSentEmail: false,
	isLoadingSentEmail: false,
	errorSentEmail: false,
	errorMessageSentEmail: '',
	// confirm password reset
	isConfirmPassword: false,
	isLoadingConfirmPassword: false,
	errorConfirmPassword: false,
	errorMessageConfirmPassword: '',
};

const resetPasswordSliсe = createSlice({
	name: 'resetPassword',
	initialState,
	reducers: {
		setIsSentEmail: (state) => {
			state.isSentEmail = false;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		clearSentEmailError: (state) => {
			state.errorSentEmail = false;
			state.errorMessageSentEmail = '';
		},
	},
	extraReducers: (builder) => {
		builder
			// initiating password reset
			.addCase(fetchInitiatingPasswordReset.fulfilled, (state) => {
				state.isSentEmail = true;
				state.isLoadingSentEmail = false;
				state.errorSentEmail = false;
			})
			.addCase(fetchInitiatingPasswordReset.pending, (state) => {
				state.isSentEmail = false;
				state.isLoadingSentEmail = true;
				state.errorSentEmail = false;
			})
			.addCase(fetchInitiatingPasswordReset.rejected, (state, action) => {
				state.isSentEmail = false;
				state.isLoadingSentEmail = false;
				state.errorSentEmail = true;
				state.errorMessageSentEmail =
					action.error.message || 'Произошла неизвестная ошибка';
			})
			// confirm password reset
			.addCase(fetchConfirmPasswordReset.fulfilled, (state) => {
				state.isConfirmPassword = true;
				state.isLoadingConfirmPassword = false;
				state.errorConfirmPassword = false;
			})
			.addCase(fetchConfirmPasswordReset.pending, (state) => {
				state.isConfirmPassword = false;
				state.isLoadingConfirmPassword = true;
				state.errorConfirmPassword = false;
			})
			.addCase(fetchConfirmPasswordReset.rejected, (state, action) => {
				state.isConfirmPassword = false;
				state.isLoadingConfirmPassword = false;
				state.errorConfirmPassword = true;
				state.errorMessageConfirmPassword =
					action.error.message || 'Произошла неизвестная ошибка';
			});
	},
});

export const { setIsSentEmail, clearSentEmailError, setEmail } =
	resetPasswordSliсe.actions;
export default resetPasswordSliсe.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchConfirmPasswordReset,
	fetchInitiatingPasswordReset,
	fetchResendActivationEmail,
} from '../thunks/resetPasswordThunk';
import { TResetPasswordState } from '../../utils/types';

const initialState: TResetPasswordState = {
	email: '',
	isSentEmail: false,
	isLoadingSentEmail: false,
	errorSentEmail: false,
	errorMessageSentEmail: '',
	isConfirmPassword: false,
	isLoadingConfirmPassword: false,
	errorConfirmPassword: false,
	errorMessageConfirmPassword: '',
};

const resetPasswordSlice = createSlice({
	name: 'resetPassword',
	initialState,
	reducers: {
		setIsSentEmail: (state) => {
			state.isSentEmail = false;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		clearSentEmailError: (state) => {
			state.errorSentEmail = false;
			state.errorMessageSentEmail = '';
		},
		clearConfirmPasswordError: (state) => {
			state.errorConfirmPassword = false;
			state.errorMessageConfirmPassword = '';
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
			})
			// resend activation email
			.addCase(fetchResendActivationEmail.fulfilled, (state) => {
				state.isSentEmail = true;
				state.isLoadingSentEmail = false;
				state.errorSentEmail = false;
			})
			.addCase(fetchResendActivationEmail.pending, (state) => {
				state.isSentEmail = false;
				state.isLoadingSentEmail = true;
				state.errorSentEmail = false;
			})
			.addCase(fetchResendActivationEmail.rejected, (state, action) => {
				state.isSentEmail = false;
				state.isLoadingSentEmail = false;
				state.errorSentEmail = true;
				state.errorMessageSentEmail =
					action.error.message || 'Произошла неизвестная ошибка';
			});
	},
});

export const {
	setIsSentEmail,
	clearSentEmailError,
	setEmail,
	clearConfirmPasswordError,
} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;

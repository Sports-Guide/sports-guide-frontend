import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';

const urRegister = `${baseURL}/users/`;

export const fetchRegister = createAsyncThunk(
	'register/post',
	async ({ nickname, email, password, passwordConfirmation }) => {
		const data = await request(urRegister, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				nickname,
				email,
				password,
				passwordConfirmation,
			}),
		});
		return data.email;
	}
);

const urlUserActivation = `${baseURL}/users/activation/`;

export const fetchUserActivation = createAsyncThunk(
	'userActivation/post',
	async ({ uid, token }) => {
		const data = await request(urlUserActivation, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				uid,
				token,
			}),
		});
		return data.email;
	}
);

const urlResendActivation = `${baseURL}/users/resend_activation/`;

export const fetchResendActivation = createAsyncThunk(
	'resendActivation/post',
	async ({ email }) => {
		const data = await request(urlResendActivation, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				email,
			}),
		});
		return data.email;
	}
);

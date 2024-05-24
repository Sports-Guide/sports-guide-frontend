import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';

interface RegisterPayload {
	nickname: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

interface UserActivationPayload {
	uid: string;
	token: string;
}

interface EmailPayload {
	email: string;
}

// Регистрация пользователя
const urlRegister = `${baseURL}/users/`;

export const fetchRegister = createAsyncThunk<string, RegisterPayload>(
	'register/post',
	async ({ nickname, email, password, passwordConfirmation }) => {
		const data = await request(urlRegister, {
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

// Активация пользователя
const urlUserActivation = `${baseURL}/users/activation/`;

export const fetchUserActivation = createAsyncThunk<
	string,
	UserActivationPayload
>('userActivation/post', async ({ uid, token }) => {
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
});

// Повторная отправка письма активации
const urlResendActivation = `${baseURL}/users/resend_activation/`;

export const fetchResendActivation = createAsyncThunk<string, EmailPayload>(
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

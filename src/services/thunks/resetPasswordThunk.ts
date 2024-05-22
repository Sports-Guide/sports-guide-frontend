/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';

interface EmailPayload {
	email: string;
}

interface PasswordResetPayload {
	uid: string;
	token: string;
	new_password: string;
}

// Отправка письма на сброс пароля
const urlInitiatingPasswordReset = `${baseURL}/users/reset_password/`;

export const fetchInitiatingPasswordReset = createAsyncThunk<
	string,
	EmailPayload
>('initiatingPasswordReset/post', async ({ email }) => {
	const data = await request(urlInitiatingPasswordReset, {
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
});

// Сброс пароля
const urlConfirmPasswordReset = `${baseURL}/users/reset_password_confirm/`;

export const fetchConfirmPasswordReset = createAsyncThunk<
	any,
	PasswordResetPayload
>('confirmPasswordReset/post', async ({ uid, token, new_password }) => {
	const data = await request(urlConfirmPasswordReset, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			uid,
			token,
			new_password,
		}),
	});
	return data;
});

// Повторная отправка письма
const urlResendActivationEmail = `${baseURL}/users/resend_activation/`;

export const fetchResendActivationEmail = createAsyncThunk<
	string,
	EmailPayload
>('resendActivationEmail/post', async ({ email }) => {
	const data = await request(urlResendActivationEmail, {
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
});

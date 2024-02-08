/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';

// Отправка письма на сброса пароля
const urlInitiatingPasswordReset = `${baseURL}/users/reset_password/`;

export const fetchInitiatingPasswordReset = createAsyncThunk(
	'initiatingPasswordReset/post',
	async ({ email }) => {
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
	}
);

// Сброса пароля

const urlConfirmPasswordReset = `${baseURL}/users/reset_password_confirm/`;

export const fetchConfirmPasswordReset = createAsyncThunk(
	'confirmPasswordReset/post',
	async ({ uid, token, new_password }) => {
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
		return data.email;
	}
);

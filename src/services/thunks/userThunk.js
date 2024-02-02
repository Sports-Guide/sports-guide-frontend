import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUserURL, baseAuthURL, request } from '../../utils/api';

// Авторизация
const urlLogin = `${baseAuthURL}/jwt/create/`;

export const fetchLogin = createAsyncThunk(
	'login/post',
	async ({ email, password }) => {
		const data = await request(urlLogin, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		localStorage.setItem('accessToken', data.access);
		localStorage.setItem('refreshToken', data.refresh);
	}
);

// Провера accessToken
const urlVerifyToken = `${baseAuthURL}/jwt/verify/`;

export const fetchVerifyToken = createAsyncThunk(
	'verifyToken/post',
	async ({ token }) => {
		await request(urlVerifyToken, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				token,
			}),
		});
	}
);

// Обновление accessToken
const urlRefreshToken = `${baseAuthURL}/jwt/refresh/`;

export const fetchRefreshToken = createAsyncThunk(
	'refreshToken/post',
	async ({ refresh }) => {
		const data = await request(urlRefreshToken, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				refresh,
			}),
		});
		localStorage.setItem('accessToken', data.access);
	}
);

// Получение данных о пользователе
const urlUserInfo = `${baseUserURL}/users/me/`;

export const fetchUserInfo = createAsyncThunk('userInfo/get', async () => {
	const token = localStorage.getItem('accessToken');
	const data = await request(urlUserInfo, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
});

// Изменение данных пользователя
export const fetchEditUserInfo = createAsyncThunk(
	'userInfo/patch',
	async ({ email, nickname }) => {
		const token = localStorage.getItem('accessToken');
		const data = await request(urlUserInfo, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				email,
				nickname,
			}),
		});
		return data;
	}
);

// Изменение пароля
const urlChangePassword = `${baseUserURL}/users/set_password/`;

export const fetchNewPassword = createAsyncThunk(
	'newPassword/post',
	async ({ currentPassword, newPassword }) => {
		const token = localStorage.getItem('accessToken');
		await request(urlChangePassword, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				currentPassword,
				newPassword,
			}),
		});
	}
);

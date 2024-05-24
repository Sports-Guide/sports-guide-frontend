import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';

// Авторизация
const urlLogin = `${baseURL}/auth/jwt/create/`;

type TUserEmailPassword = {
	email: string;
	password: string;
};

export const fetchLogin = createAsyncThunk(
	'login/post',
	async ({ email, password }: TUserEmailPassword) => {
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
const urlVerifyToken = `${baseURL}/auth/jwt/verify/`;

export const fetchVerifyToken = createAsyncThunk(
	'verifyToken/post',
	async ({ token }: { token: string }) => {
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
const urlRefreshToken = `${baseURL}/auth/jwt/refresh/`;

export const fetchRefreshToken = createAsyncThunk(
	'refreshToken/post',
	async ({ refresh }: { refresh: string }) => {
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
const urlUserInfo = `${baseURL}/users/me/`;

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

type TUserEmailNickname = {
	email: string;
	nickname: string;
};

// Изменение данных пользователя
export const fetchEditUserInfo = createAsyncThunk(
	'userInfo/patch',
	async ({ email, nickname }: TUserEmailNickname) => {
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

// Изменение аватара
const urlChangeAvatar = `${baseURL}/users/me/upload_photo/`;

export const fetchChangeAvatar = createAsyncThunk(
	'changeAvatar/post',
	async ({ photo }: { photo: string }) => {
		const token = localStorage.getItem('accessToken');
		const formData = new FormData();
		formData.append('photo', photo);
		const data = await request(urlChangeAvatar, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});
		return data;
	}
);

// Удаление профиля
export const fetchDeleteProfile = createAsyncThunk(
	'deleteProfile/delete',
	async () => {
		const token = localStorage.getItem('accessToken');
		await request(`${baseURL}/users/me/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	}
);

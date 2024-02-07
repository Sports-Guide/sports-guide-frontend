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

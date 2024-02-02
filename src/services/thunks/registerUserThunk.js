import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUserURL, request } from '../../utils/api';

const urRegister = `${baseUserURL}/users/`;

export const fetchRegister = createAsyncThunk(
	'register/post',
	async ({ nickname, email, password, passwordConfirmation }) => {
		await request(urRegister, {
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
	}
);

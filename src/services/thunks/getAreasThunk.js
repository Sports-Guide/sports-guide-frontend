import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUserURL, request } from '../../utils/api';

const urRegister = `${baseUserURL}/areas/`;

export const fetchGetAreas = createAsyncThunk('areas/get', async () => {
	const data = await request(urRegister, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	return data;
});

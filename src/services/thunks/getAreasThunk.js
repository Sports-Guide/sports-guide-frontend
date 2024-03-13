import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';

const urlAreas = `${baseURL}/areas/`;

export const fetchGetAreas = createAsyncThunk('areas/get', async () => {
	const data = await request(urlAreas, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	return data;
});

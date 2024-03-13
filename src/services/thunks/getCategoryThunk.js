import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';

const urlCategory = `${baseURL}/categories/`;

export const fetchGetCategory = createAsyncThunk('category/get', async () => {
	const data = await request(urlCategory, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	return data;
});

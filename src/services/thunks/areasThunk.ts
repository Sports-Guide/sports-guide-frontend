import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';
import {
	SportGrounds,
	Categories,
	Comments,
	AddAreaRequestData,
} from '../../utils/types';

const urlAreas = `${baseURL}/areas/`;
const urlCategory = `${baseURL}/categories/`;

export const fetchGetAreas = createAsyncThunk<SportGrounds>(
	'areas/get',
	async () => {
		const data = await request(urlAreas, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		return data;
	}
);

export const fetchAddArea = createAsyncThunk<void, AddAreaRequestData>(
	'area/post',
	async (requestData) => {
		const { address, description, latitude, longitude, categories, images } =
			requestData;
		const token = localStorage.getItem('accessToken');
		const dataArea = new FormData();
		dataArea.append('address', address);
		dataArea.append('description', description);
		dataArea.append('latitude', latitude);
		dataArea.append('longitude', longitude);
		dataArea.append('categories', categories.join(','));
		images.forEach((foto) => {
			dataArea.append('images', foto);
		});
		await request(urlAreas, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: dataArea,
		});
	}
);

export const fetchGetCategory = createAsyncThunk<Categories>(
	'category/get',
	async () => {
		const data = await request(urlCategory, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		return data;
	}
);

export const fetchGetAreaComments = createAsyncThunk<Comments, number>(
	'areaInfo/get',
	async (id) => {
		const data = await request(`${urlAreas}${id}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		return data;
	}
);

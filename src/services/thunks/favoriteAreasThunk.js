import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';

const urlAreas = `${baseURL}/areas/`;
const urlFavoriteAreas = `${baseURL}/areas/favorites/`;
const urlMyAreas = `${baseURL}/areas/my/`;

export const fetchAddAreaToFavorite = createAsyncThunk(
	'areaToFavorite/post',
	async (area) => {
		const token = localStorage.getItem('accessToken');
		await request(`${urlAreas}${area.id}/favorite/`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				area,
			}),
		});
		return area;
	}
);

export const fetchDeleteAreaFromFavorite = createAsyncThunk(
	'areaDeleteFromFavorite/delete',
	async (area) => {
		const token = localStorage.getItem('accessToken');
		await request(`${urlAreas}${area.id}/favorite/`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ area }),
		});
		return area;
	}
);

export const fetchGetFavoriteAreas = createAsyncThunk(
	'favoriteAreas/get',
	async () => {
		const token = localStorage.getItem('accessToken');
		const data = await request(urlFavoriteAreas, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	}
);

export const fetchGetMyAreas = createAsyncThunk('MyAreas/get', async () => {
	const token = localStorage.getItem('accessToken');
	const data = await request(urlMyAreas, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
});

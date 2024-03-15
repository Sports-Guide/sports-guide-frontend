import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, request } from '../../utils/api';

const urlAddArea = `${baseURL}/areas/`;

export const fetchAddArea = createAsyncThunk(
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
		dataArea.append('categories', categories);
		images.forEach((foto) => {
			dataArea.append('images', foto);
		});
		await request(urlAddArea, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: dataArea,
		});
	}
);

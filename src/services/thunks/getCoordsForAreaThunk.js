import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/api';

const urlCoords = 'https://nominatim.openstreetmap.org/search?';

export const fetchGetCoordsForArea = createAsyncThunk(
	'coords/get',
	async (area) => {
		const params = new URLSearchParams({
			q:
				area === 'город Москва'
					? area
					: `${area} административный округ, Москва`,
			format: 'json',
			polygon_geojson: 1,
		});

		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		};

		const data = await request(`${urlCoords}${params}`, options);
		return data;
	}
);

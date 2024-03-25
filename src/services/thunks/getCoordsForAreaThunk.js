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
		let coords = [];
		if (data && data.length > 0) {
			const firstResult = data[0];
			if (firstResult.geojson && firstResult.geojson.coordinates) {
				const polygonCoordinates = firstResult.geojson.coordinates;
				let modifiedCoordinates = [];
				if (polygonCoordinates.every((subArray) => subArray.length === 1)) {
					modifiedCoordinates = polygonCoordinates.flat();
				} else {
					modifiedCoordinates = polygonCoordinates;
				}
				coords = modifiedCoordinates;
			} else {
				console.error('Полигон не найден в ответе API');
			}
		} else {
			console.error('Данные не получены от API');
		}
		return coords;
	}
);

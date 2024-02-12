const BASE_URL = 'https://sports-map.ru/api/auth';
const SPORT_GROUNDS_URL = 'https://sports-map.ru/api';
// const COORDS_URL = 'https://nominatim.openstreetmap.org/search';
// const BASE_URL = 'http://localhost:3000';

export function validateResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(
		new Error(`Ошибка получения ответа от сервера: ${res.status}`)
	);
}

// запрос на данные текущего пользователя
export const getUserInfo = () => {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/users/me/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}).then(validateResponse);
};

// запрос на изменение данных пользователя
export const editEmailAndNickname = (email, nickname) => {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/users/me/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			email,
			nickname,
		}),
	}).then(validateResponse);
};

export const editPassword = (currentPassword, newPassword) => {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/users/set_password/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			currentPassword,
			newPassword,
		}),
	}).then(validateResponse);
};

// получаем площадки
export function getAreas() {
	return fetch(`${SPORT_GROUNDS_URL}/areas/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(validateResponse);
}

export function getCoords() {
	const params = new URLSearchParams({
		q: 'Центральный округ, Москва',
		format: 'json',
		polygon_geojson: 1,
	});

	return fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
		method: 'GET',
	}).then(validateResponse);
}

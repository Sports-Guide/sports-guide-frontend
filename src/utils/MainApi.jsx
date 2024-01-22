const BASE_URL = 'https://sports-map.ru/api/auth';
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
	fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(validateResponse);
};

// запрос на изменение данных пользователя
export const editEmailAndNickname = (formValues) => {
	fetch(`${BASE_URL}/users/me/`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// 'Authorization': `Bearer ${formValues.token}`
		},
		body: JSON.stringify({
			email: formValues.email,
			nickname: formValues.nickname,
		}),
	}).then(validateResponse);
};

export const editPassword = (currentPassword, newPassword) => {
	fetch(`${BASE_URL}/users/set_password/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// 'Autohorization': `Bearer ${}`
		},
		body: JSON.stringify({
			currentPassword,
			newPassword,
		}),
	}).then(validateResponse);
};

// получаем площадки
export const getAreas = () => {
	fetch(`${BASE_URL}/areas/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(validateResponse);
};

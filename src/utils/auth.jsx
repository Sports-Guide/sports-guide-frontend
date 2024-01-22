const BASE_URL = 'https://sports-map.ru/api/auth';

/* const BASE_URL = "http://localhost:3000";
https://sports-map.ru/api/auth/jwt/create/
https://sports-map.ru/api/auth/jwt/refresh/
https://sports-map.ru/api/auth/jwt/verify/ 
https://sports-map.ru/api/auth/users/
*/

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

// Регистрация пользователя
function register(nickname, email, password) {
	return fetch(`${BASE_URL}/users/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({ nickname, email, password }),
	}).then(checkResponse);
}

// Авторизация пользователя
function login(email, password) {
	return fetch(`${BASE_URL}/jwt/create/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}

// Аутинфикация пользователя
function checkToken(token) {
	return fetch(`${BASE_URL}/jwt/verify`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}).then(checkResponse);
}

export { register, login, checkToken };

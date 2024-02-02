export const baseUserURL = 'https://sports-map.ru/api';
export const baseAuthURL = 'https://sports-map.ru/api/auth';

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
function register(nickname, email, password, passwordConfirmation) {
	return fetch(`${baseUserURL}/users/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(nickname, email, password, passwordConfirmation),
	}).then(checkResponse);
}

// Авторизация пользователя
function login(email, password) {
	const token = localStorage.getItem('token');
	return fetch(`${baseAuthURL}/jwt/create/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}

// Аутинфикация пользователя
function checkToken(token) {
	return fetch(`${baseAuthURL}/jwt/verify/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ token }),
	}).then(checkResponse);
}

export { register, login, checkToken };

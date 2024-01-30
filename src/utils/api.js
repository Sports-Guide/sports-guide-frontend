export const baseURL = 'https://sports-map.ru/api/auth';

function checkResponse(res) {
	const contentType = res.headers.get('content-type');
	if (contentType && contentType.includes('application/json')) {
		return res.json().then((data) => {
			if (res.ok) {
				return data;
			}
			return Promise.reject(new Error(data.message || `Ошибка: ${res.status}`));
		});
	}
	return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

export function request(url, options) {
	return fetch(url, options)
		.then(checkResponse)
		.catch((error) => {
			if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
				return Promise.reject(
					new Error('Ошибка сети: Не удалось выполнить запрос')
				);
			}
			return Promise.reject(new Error(error.message || error.toString()));
		});
}

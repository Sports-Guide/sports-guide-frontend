import { setAuthFalse, setAuthTrue } from '../slices/userSlice';
import { fetchRefreshToken, fetchVerifyToken } from './userThunk';

// Тестовый юзер
// testuse769627r@mail.com
// hgk67Ghs

export const checkUserAuth = () => async (dispatch) => {
	const accessToken = localStorage.getItem('accessToken');
	if (!accessToken) {
		dispatch(setAuthFalse());
		return; // Если accessToken нет, то не проверяем токены
	}
	try {
		// Проверить действительность accessToken
		await dispatch(fetchVerifyToken({ token: accessToken })).unwrap();
		// Если успешно, пользователь авторизован
		dispatch(setAuthTrue());
	} catch {
		const refreshToken = localStorage.getItem('refreshToken');
		if (refreshToken) {
			try {
				// Если accessToken не действителен, пытаемся его обновить через refreshToken
				await dispatch(fetchRefreshToken({ refresh: refreshToken })).unwrap();
				// Обработка успешного обновления accessToken
				dispatch(setAuthTrue());
			} catch {
				// если не удалось обновить refreshToken
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				dispatch(setAuthFalse());
			}
		} else {
			// Очищаем данные пользователя, так как у нас нет действующих токенов
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			dispatch(setAuthFalse());
		}
	}
};

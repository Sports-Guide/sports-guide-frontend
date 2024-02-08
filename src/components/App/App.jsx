/* eslint no-console: "off" */
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth } from '../../services/thunks/checkUserAuthThunk';
import { Main } from '../Main/Main';
import { Profile } from '../Profile/Profile';
import AreaApp from '../Area/AreaApp';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { SportsGround } from '../SportsGround/SportsGround';
import Layuot from '../Layout/Layout';
import { PersonalData } from '../Profile/PersonalData';
import { PasswordData } from '../Profile/PasswordData';
import * as api from '../../utils/MainApi';
import ProtectedOnlyAuth from '../ProtectedRoute/ProtectedRoute';
import {
	getContentByType,
	getTitleByType,
	getTitleStyleByType,
} from '../../utils/modal';
import { Popup } from '../Popup/Popup';
import { closeModal } from '../../services/slices/modalSlice';

export function App() {
	// eslint-disable-next-line no-unused-vars
	const [areas, setAreas] = useState([]);

	const dispatch = useDispatch();

	const location = useLocation(); // Получение текущего местоположения

	// проверка авторизован ли пользователь
	useEffect(() => {
		dispatch(checkUserAuth());
	}, [dispatch, location]);

	// параметры для установки состояний popup
	const { isOpen, type } = useSelector((state) => state.modal);

	// Закрытие модального окна
	const handleCloseModal = useCallback(() => {
		dispatch(closeModal());
	}, [dispatch]);

	// Закрытие модального окна по Escape
	useEffect(() => {
		const handleEsc = (event) => {
			if (event.key === 'Escape') {
				handleCloseModal();
			}
		};
		document.addEventListener('keydown', handleEsc);
		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [handleCloseModal]);

	// получаем данные площадок
	useEffect(() => {
		api
			.getAreas()
			.then((areasData) => {
				setAreas(areasData);
			})
			.catch((err) => {
				console.log(`Ошибка при получении данных о площадках: ${err}`);
			});
	}, []);

	return (
		<>
			<Routes>
				<Route path="/" element={<Layuot />}>
					<Route index element={<Main areas={areas} />} />
					<Route
						path="app-area"
						element={
							<ProtectedOnlyAuth component={<AreaApp areas={areas} />} />
						}
					/>
					<Route
						path="profile"
						element={<ProtectedOnlyAuth component={<Profile />} />}
					>
						<Route index element={<PersonalData />} />
						<Route path="password" element={<PasswordData />} />
					</Route>
					<Route path="sports-ground" element={<SportsGround />} />

					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
			{isOpen && (
				<Popup
					handleClose={handleCloseModal}
					title={getTitleByType(type)}
					titleStyle={getTitleStyleByType(type)}
				>
					{getContentByType(type, handleCloseModal)}
				</Popup>
			)}
		</>
	);
}

export default App;

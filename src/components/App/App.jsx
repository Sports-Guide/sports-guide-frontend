/* eslint no-console: "off" */
import React, { useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth } from '../../services/thunks/checkUserAuthThunk';
import Main from '../../pages/Main/Main';
import Profile from '../../pages/Profile/Profile';
import AreaApp from '../../pages/Area/AreaApp';
import SportsGround from '../../pages/SportsGround/SportsGround';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import PrivacyPolicy from '../../pages/PrivacyPolicy/PrivacyPolicy';
import PasswordResetPage from '../../pages/PasswordResetPage/PasswordResetPage';
import Layout from '../Layout/Layout';
import { Popup } from '../Popup/Popup';
import ProtectedOnlyAuth from '../ProtectedRoute/ProtectedRoute';
import PersonalData from '../../pages/Profile/PersonalData/PersonalData';
import PasswordData from '../../pages/Profile/PasswordData/PasswordData';
import Favourites from '../../pages/Profile/Favourites/Favourites';
import MyAreas from '../../pages/Profile/MyAreas/MyAreas';
import {
	getContentByType,
	getTitleByType,
	getTitleStyleByType,
} from '../../utils/modal';
import { closeModal } from '../../services/slices/modalSlice';
import { MetaTags } from '../MetaTags/MetaTags';
import {
	fetchGetAreas,
	fetchGetCategory,
} from '../../services/thunks/areasThunk';
import {
	fetchGetFavoriteAreas,
	fetchGetMyAreas,
} from '../../services/thunks/favoriteAreasThunk';

export function App() {
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
		dispatch(fetchGetAreas());
		dispatch(fetchGetCategory());
		dispatch(fetchGetFavoriteAreas());
		dispatch(fetchGetMyAreas());
	}, [dispatch]);

	return (
		<>
			<MetaTags />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<Route path="/activate/:uid/:token" element={<Main />} />
					<Route
						path="app-area"
						element={<ProtectedOnlyAuth component={<AreaApp />} />}
					/>
					<Route
						path="profile"
						element={<ProtectedOnlyAuth component={<Profile />} />}
					>
						<Route index element={<PersonalData />} />
						<Route path="password" element={<PasswordData />} />
						<Route path="favourites" element={<Favourites />} />
						<Route path="my-areas" element={<MyAreas />} />
					</Route>
					<Route path="sports-ground/:id" element={<SportsGround />} />
					<Route
						path="password/reset/confirm/:uid/:token"
						element={<PasswordResetPage />}
					/>
					<Route path="privacy-policy" element={<PrivacyPolicy />} />
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

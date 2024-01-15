import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from '../Main/Main';
import { Profile } from '../Profile/Profile';
import { AreaApp } from '../Area/AreaApp';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { SportsGround } from '../SportsGround/SportsGround';
import Layuot from '../Layout/Layout';

export function App() {
	const [isEditing, setIsEditing] = useState(false);
	// состояния попапов
	const [isDeleteAccountPopupOpen, setDeleteAccountPopupOpen] = useState(false);
	const [isLogoutConfirmationPopupOpen, setLogoutConfirmationPopupOpen] =
		useState(false);

	const handleEditButtonClick = () =>
		isEditing ? setIsEditing(false) : setIsEditing(true);

	const handleDeleteAccount = () => {
		console.log('Аккаунт удален');
	};

	const handleLogOut = () => {
		console.log('Вы вышли из аккаунта');
	};

	// создаём обработчики для открытия попапов
	const handleDeleteAccountBtnClick = () => {
		setDeleteAccountPopupOpen(true);
	};
	const handleLogOutClick = () => {
		setLogoutConfirmationPopupOpen(true);
	};

	const handleChangePassword = () => {
		if (isEditing) {
			setIsEditing(false);
		} else setIsEditing(true);
		console.log('Пароль изменен');
	};

	// функция закрытия всех попапов
	const closeAllPopups = () => {
		setDeleteAccountPopupOpen(false);
		setLogoutConfirmationPopupOpen(false);
	};

	// закрываем попапы по Esc
	useEffect(() => {
		const closeWithEsc = (e) => {
			if (e.key === 'Escape') {
				closeAllPopups();
			}
		};
		document.addEventListener('keydown', closeWithEsc);
		// удаляем событие при размонтировании компонента
		return () => {
			document.removeEventListener('keydown', closeWithEsc);
		};
	}, [isDeleteAccountPopupOpen, isLogoutConfirmationPopupOpen]);

	return (
		<Routes>
			<Route path="/" element={<Layuot />}>
				<Route index element={<Main />} />
				<Route path="app-area" element={<AreaApp />} />
				<Route
					path="profile"
					element={
						<Profile
							onEditProfile={handleEditButtonClick}
							isEditing={isEditing}
							onEditPassword={handleChangePassword}
							onDelete={handleDeleteAccount}
							onLogOut={handleLogOut}
							onDeleteAccountPopupOpen={handleDeleteAccountBtnClick}
							onLogoutPopupOpen={handleLogOutClick}
							isDeleteAccountPopupOpen={isDeleteAccountPopupOpen}
							isLogoutPopupOpen={isLogoutConfirmationPopupOpen}
							onClose={closeAllPopups}
						/>
					}
				/>
				<Route path="sports-ground" element={<SportsGround />} />
				<Route path="signin" element={<Login />} />
				<Route path="signup" element={<Register />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default App;

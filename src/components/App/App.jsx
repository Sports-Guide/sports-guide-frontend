import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import { Profile } from '../Profile/Profile';
import { AreaApp } from '../Area/AreaApp';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { SportsGround } from '../SportsGround/SportsGround';

export function App() {
	const [isEditing, setIsEditing] = useState(false);
	// состояния попапов
	const [isDeleteAccountPopupOpen, setDeleteAccountPopupOpen] = useState(false);
	const [isLogoutConfirmationPopupOpen, setLogoutConfirmationPopupOpen] =
		useState(false);
	const [isPasswordEditPopupOpen, setIsPasswordEditPopupOpen] = useState(false);

	const handleEditButtonClick = () =>
		isEditing ? setIsEditing(false) : setIsEditing(true);
	// const handleEditButtonClick = () => {
	// 	setIsEditing(true);
	// };

	const handleDeleteAccount = () => {
		console.log('Аккаунт удален');
	};

	const handleLogOut = () => {
		console.log('Вы вышли из аккаунта');
	};

	// создаём обработчики для открытия попапов
	const handlePasswordEditBtnClick = () => {
		setIsPasswordEditPopupOpen(true);
	};
	const handleDeleteAccountBtnClick = () => {
		setDeleteAccountPopupOpen(true);
	};
	const handleLogOutClick = () => {
		setLogoutConfirmationPopupOpen(true);
	};

	const handleChangePassword = () => {
		console.log('Пароль изменен');
	};

	// функция закрытия всех попапов
	const closeAllPopups = () => {
		setDeleteAccountPopupOpen(false);
		setLogoutConfirmationPopupOpen(false);
		setIsPasswordEditPopupOpen(false);
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
	}, [
		isDeleteAccountPopupOpen,
		isLogoutConfirmationPopupOpen,
		isPasswordEditPopupOpen,
	]);

	return (
		<div className="app">
			<BrowserRouter>
				<div className="page__container">
					<Header />
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/app-area" element={<AreaApp />} />
						<Route
							path="/profile"
							element={
								<Profile
									onEditProfile={handleEditButtonClick}
									isEditing={isEditing}
									onEditPassword={handlePasswordEditBtnClick}
									onDelete={handleDeleteAccount}
									onLogOut={handleLogOut}
									onDeleteAccountPopupOpen={handleDeleteAccountBtnClick}
									onLogoutPopupOpen={handleLogOutClick}
									isDeleteAccountPopupOpen={isDeleteAccountPopupOpen}
									isLogoutPopupOpen={isLogoutConfirmationPopupOpen}
									isPasswordEditPopupOpen={isPasswordEditPopupOpen}
									onChangePasswordSubmit={handleChangePassword}
									onClose={closeAllPopups}
								/>
							}
						/>
						<Route path="/sports-ground" element={<SportsGround />} />
						<Route path="/signin" element={<Login />} />
						<Route path="/signup" element={<Register />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
					<Footer />
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;

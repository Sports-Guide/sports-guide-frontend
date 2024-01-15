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
	const [isOnLogInPopUpOpen, setOnLogInPopUpOpen] = useState(false);
	const [isOnRegisterPopUpOpen, setOnRegisterPopUpOpen] = useState(false);
	const [isPasswordEditPopupOpen, setIsPasswordEditPopupOpen] = useState(false);

	const handleEditButtonClick = () =>
		isEditing ? setIsEditing(false) : setIsEditing(true);

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

	const handleOnLogInClick = () => {
		setOnLogInPopUpOpen(true);
		setOnRegisterPopUpOpen(false);
	};

	const handleOpenSignUpPopUp = () => {
		setOnRegisterPopUpOpen(true);
		setOnLogInPopUpOpen(false);
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
		setIsPasswordEditPopupOpen(false);
		setOnLogInPopUpOpen(false);
		setOnRegisterPopUpOpen(false);
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
		isOnLogInPopUpOpen,
		isOnRegisterPopUpOpen,
	]);

	return (
		<div className="app">
			<div className="page__container">
				<Routes>
					<Route
						path="/"
						element={<Layuot handleOnLogInClick={handleOnLogInClick} />}
					>
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

						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
				<Login
					isOnLogInPopUpOpen={isOnLogInPopUpOpen}
					onClose={closeAllPopups}
					toSignUpPopUp={handleOpenSignUpPopUp}
					/* onLogin={handleLogin}
			onPasswordRecovery={handleOpenPasswordRecoveryPopUp}
			 */
				/>
				<Register
					isOnRegisterPopUpOpen={isOnRegisterPopUpOpen}
					onClose={closeAllPopups}
					toSignInPopUp={handleOnLogInClick}
				/>
			</div>
		</div>
	);
}

export default App;

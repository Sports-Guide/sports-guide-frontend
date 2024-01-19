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
import PasswordRecoveryPopUp from '../PasswordRecoveryPopUp/PasswordRecoveryPopUp';

export function App() {
	// const [isEditing, setIsEditing] = useState(false);
	const [isPasswordEditing, setIsPasswordEditing] = useState(false);
	const [isPersonalDataEditing, setIsPersonalDataEditing] = useState(false);
	// состояния попапов
	const [isDeleteAccountPopupOpen, setDeleteAccountPopupOpen] = useState(false);
	const [isLogoutConfirmationPopupOpen, setLogoutConfirmationPopupOpen] =
		useState(false);
	const [isOnLogInPopUpOpen, setOnLogInPopUpOpen] = useState(false);
	const [isOnRegisterPopUpOpen, setOnRegisterPopUpOpen] = useState(false);
	const [isPasswordRecoveryPopUpOpen, setPasswordRecoveryPopUpOpen] =
		useState(false);

	// const handleEditButtonClick = () =>
	// 	isEditing ? setIsEditing(false) : setIsEditing(true);
	const handlePersonalDataEditBtnClick = () =>
		isPersonalDataEditing
			? setIsPersonalDataEditing(false)
			: setIsPersonalDataEditing(true);

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

	const handleOnLogInClick = () => {
		setOnLogInPopUpOpen(true);
		setOnRegisterPopUpOpen(false);
	};

	const handleOpenSignUpPopUp = () => {
		setOnRegisterPopUpOpen(true);
		setOnLogInPopUpOpen(false);
	};

	const handleOpenPasswordRecoveryPopUp = () => {
		setPasswordRecoveryPopUpOpen(true);
		setOnLogInPopUpOpen(false);
	};

	const handleChangePassword = () => {
		if (isPasswordEditing) {
			setIsPasswordEditing(false);
		} else setIsPasswordEditing(true);
		console.log('Пароль изменен');
	};

	// функция закрытия всех попапов
	const closeAllPopups = () => {
		setDeleteAccountPopupOpen(false);
		setLogoutConfirmationPopupOpen(false);
		setOnLogInPopUpOpen(false);
		setOnRegisterPopUpOpen(false);
		setPasswordRecoveryPopUpOpen(false);
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
		isOnLogInPopUpOpen,
		isOnRegisterPopUpOpen,
		isPasswordRecoveryPopUpOpen,
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
									onEditPersonalData={handlePersonalDataEditBtnClick}
									onEditPassword={handleChangePassword}
									isPersonalDataEditing={isPersonalDataEditing}
									isPasswordEditing={isPasswordEditing}
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
						<Route path="/sports-ground" element={<SportsGround />} />

						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
				<Login
					isOnLogInPopUpOpen={isOnLogInPopUpOpen}
					onClose={closeAllPopups}
					toSignUpPopUp={handleOpenSignUpPopUp}
					onPasswordRecovery={handleOpenPasswordRecoveryPopUp}
					/* onLogin={handleLogin}
		
		 */
				/>
				<Register
					isOnRegisterPopUpOpen={isOnRegisterPopUpOpen}
					onClose={closeAllPopups}
					toSignInPopUp={handleOnLogInClick}
				/>
				<PasswordRecoveryPopUp
					isPasswordRecoveryPopUpOpen={isPasswordRecoveryPopUpOpen}
					onClose={closeAllPopups}
				/>
			</div>
		</div>
	);
}

export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Main } from '../Main/Main';
import { Profile } from '../Profile/Profile';
import AreaApp from '../Area/AreaApp';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { SportsGround } from '../SportsGround/SportsGround';
import Layuot from '../Layout/Layout';
import PasswordRecoveryPopUp from '../PasswordRecoveryPopUp/PasswordRecoveryPopUp';

import * as auth from '../../utils/auth';
import * as api from '../../utils/MainApi';

export function App() {
	// const [isEditing, setIsEditing] = useState(false);
	const [isPasswordEditing, setIsPasswordEditing] = useState(false);
	const [isPersonalDataEditing, setIsPersonalDataEditing] = useState(false);
	// стейт для отображения e-mail пользователя
	// eslint-disable-next-line no-unused-vars
	const [userEmail, setUserEmail] = useState('');
	// состояния попапов
	const [isDeleteAccountPopupOpen, setDeleteAccountPopupOpen] = useState(false);
	const [isLogoutConfirmationPopupOpen, setLogoutConfirmationPopupOpen] =
		useState(false);
	const [isOnLogInPopUpOpen, setOnLogInPopUpOpen] = useState(false);
	const [isOnRegisterPopUpOpen, setOnRegisterPopUpOpen] = useState(false);
	const [isPasswordRecoveryPopUpOpen, setPasswordRecoveryPopUpOpen] =
		useState(false);
	const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
	const [isCheckPopup, setIsCheckPopup] = useState(false);

	// стейт для серверных ошибок
	// const [errorMessage, setErrorMessage] = useState('');
	const [regErrorMessage, setRegErrorMessage] = useState('');
	const [logErrorMessage, setLogErrorMessage] = useState('');

	// создаём стейт для проверки пользователя на авторизацию
	const [loggedIn, setLoggedIn] = useState(false);

	const [isSucceeded, setIsSucceeded] = useState(false);

	const [currentUser, setCurrentUser] = useState({});
	// eslint-disable-next-line no-unused-vars
	const [areas, setAreas] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const handleTokenCheck = (token) => {
			auth
				.checkToken(token)
				.then((res) => {
					if (res) {
						setUserEmail(res.email);
						setCurrentUser(res.user);
						setLoggedIn(true);
					}
				})
				.catch((err) => console.log(err));
		};
		const token = localStorage.getItem('token');
		if (token) {
			handleTokenCheck(token);
		}
	}, [navigate]);

	// получаем данные пользователя
	useEffect(() => {
		if (loggedIn) {
			api
				.getUserInfo()
				.then((userData) => {
					setCurrentUser(userData);
					JSON.stringify(localStorage.getItem('userData', userData));
					console.log(`userData ${JSON.stringify(userData)}`);
				})
				.catch((err) => {
					console.log(`Ошибка при получении данных пользователя: ${err}`);
					setLoggedIn(false);
				});
		}
	}, [loggedIn]);

	// получаем данные площадок
	useEffect(() => {
		if (loggedIn) {
			api
				.getAreas()
				.then((areasData) => {
					setAreas(areasData);
				})
				.catch((err) => {
					console.log(`Ошибка при получении данных о площадках: ${err}`);
					setLoggedIn(false);
				});
		}
	}, [loggedIn]);

	// сохраняем email
	useEffect(() => {
		const currentEmail = localStorage.getItem('email');
		if (currentEmail) {
			setUserEmail(currentEmail);
		} else setUserEmail('');
	}, []);

	const handleLogIn = async (email, password) => {
		setLogErrorMessage('');
		if (!email || !password) {
			setLogErrorMessage('Заполните все поля');
			return;
		}
		try {
			const response = await auth.login(email, password);
			if (!response || response.statusCode === 401) {
				setLogErrorMessage(response.message);
			} else {
				localStorage.setItem('userEmail', email);
				localStorage.setItem('token', response.access);
				setUserEmail(response.email);
				setLoggedIn(true);
				setCurrentUser(response.user);
				console.log(`Пользователь ${email} авторизован`);
				navigate('/', { replace: true });
				setOnLogInPopUpOpen(false);
			}
		} catch (err) {
			console.log(`Ошибка авторизации: ${err}`);
			setLogErrorMessage(err.message);
		} finally {
			setLogErrorMessage('');
		}
	};

	const handleRegistration = async (
		nickname,
		email,
		password,
		passwordConfirmation
	) => {
		setRegErrorMessage('');
		try {
			const response = await auth.register(
				nickname,
				email,
				password,
				passwordConfirmation
			);
			if (!response || response.statusCode === 400) {
				setRegErrorMessage(response.message);
			} else {
				handleLogIn(response.email, response.password);
				localStorage.setItem('userEmail', response.email);
				setIsSucceeded(true);
				console.log(`email = ${response.email}`);
				console.log(`Пользователь ${response.email} зарегистрирован`);
				setOnRegisterPopUpOpen(false);
				navigate('/', { replace: true });
			}
		} catch (err) {
			console.log(`Ошибка регистрации: ${err}`);
			setRegErrorMessage(err.message);
		} finally {
			setRegErrorMessage('');
		}
	};

	// const handleEditButtonClick = () =>
	// 	isEditing ? setIsEditing(false) : setIsEditing(true);
	const handlePersonalDataEditBtnClick = () =>
		isPersonalDataEditing
			? setIsPersonalDataEditing(false)
			: setIsPersonalDataEditing(true);

	const handleDeleteAccount = () => {
		setDeleteAccountPopupOpen(false);
		navigate('/', { replace: true });
		console.log('Аккаунт удален');
	};

	const handleLogOut = () => {
		setLogoutConfirmationPopupOpen(false);
		navigate('/', { replace: true });
		setCurrentUser({});
		localStorage.removeItem('userId');
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
		setInfoTooltipOpen(false);
		setIsCheckPopup(false);
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
		isInfoTooltipOpen,
		isCheckPopup,
	]);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="app">
				<div className="page__container">
					<Routes>
						<Route
							path="/"
							element={<Layuot handleOnLogInClick={handleOnLogInClick} />}
						>
							<Route path="/" element={<Main />} />
							<Route
								path="/app-area"
								element={
									<AreaApp
										onClose={closeAllPopups}
										isCheckPopup={isCheckPopup}
										handleAreaApp={setIsCheckPopup}
									/>
								}
							/>
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
						logErrorMessage={logErrorMessage}
						onLogIn={handleLogIn}
					/>
					<Register
						isOnRegisterPopUpOpen={isOnRegisterPopUpOpen}
						onClose={closeAllPopups}
						toSignInPopUp={handleOnLogInClick}
						regErrorMessage={regErrorMessage}
						onRegister={handleRegistration}
						isInfoTooltipOpen={isInfoTooltipOpen}
						isSucceeded={isSucceeded}
					/>
					<PasswordRecoveryPopUp
						isPasswordRecoveryPopUpOpen={isPasswordRecoveryPopUpOpen}
						onClose={closeAllPopups}
					/>
				</div>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;

// одновременное полечение данных пользователя и площадок
// useEffect(() => {
// 	if (loggedIn) {
// 		Promise.all([api.getUserInfo(), api.getAreas()])
// 			.then(([userData, areasData]) => {
// 				setCurrentUser(userData);
// 				setAreas(areasData);
// 			})
// 			.catch((err) => {
// 				console.log(`Ошибка при получении данных: ${err}`);
// 				setLoggedIn(false);
// 			});
// 	}
// }, [loggedIn]);

import { createSlice } from '@reduxjs/toolkit';
import {
	fetchLogin,
	fetchUserInfo,
	fetchEditUserInfo,
	fetchNewPassword,
	fetchDeleteProfile,
} from '../thunks/userThunk';

// initialState хранит начальное состояние(напоминает первый аргумент в хуке useState)
export const initialState = {
	// Login
	isLogin: false,
	isLoadingLogin: false,
	errorLogin: false,
	errorMessageLogin: '',
	// User
	userData: null,
	// userPassword: '',
	isLoadingUser: false,
	errorUser: false,
	errorMessageUser: '',
	// Сheck User Auth
	isUserAuth: false, // проверяет авторизован ли юзер
	isAuthInitialized: false, // отслеживает состояние проверки: авторизован ли юзео
	// Edit User Data
	isUserDataEditing: false, // состояние редактирования
	isLoadingUserData: false, // загрузка/обновление данных
	errorEditUserData: false,
	errorMessageEditUserData: '',
	// Edit Password
	isPasswordEditing: false,
	isLoadingPassword: false,
	errorEditPassword: false,
	errorMessageEditPassword: '',
	// Delete Profile
	isLoadingDeleteProfile: false,
	errorDeleteProfile: false,
	errorMessageDeleteProfile: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	// reducers используется для изменения состояния (напоминает второй аргумент в хуке useState)
	reducers: {
		setAuthTrue: (state) => {
			state.isUserAuth = true;
			state.isAuthInitialized = true;
		},
		setAuthFalse: (state) => {
			state.isUserAuth = false;
			state.userData = null;
			state.isAuthInitialized = true;
			state.isLogin = false;
		},
		setAuthInitializing: (state) => {
			state.isAuthInitialized = false; // Начинается процесс проверки: авторизован ли юзер
		},
		clearLoginError: (state) => {
			state.errorLogin = false;
			state.errorMessageLogin = '';
		},
		setIsUserDataEditingTrue: (state) => {
			state.isUserDataEditing = true;
		},
		setIsUserDataEditingFalse: (state) => {
			state.isUserDataEditing = false;
		},
		clearEditUserDataError: (state) => {
			state.errorEditUserData = false;
			state.errorMessageEditUserData = '';
		},
		setIsPasswordEditingTrue: (state) => {
			state.isPasswordEditing = true;
		},
		setIsPasswordEditingFalse: (state) => {
			state.isPasswordEditing = false;
		},
	},
	// extraReducers используется для изменения состояния при выполнении АПИ запросов(напоминает второй аргумент в хука useState)
	extraReducers: (builder) => {
		builder
			// авторизация
			.addCase(fetchLogin.fulfilled, (state) => {
				state.isUserAuth = true;
				state.isLogin = true;
				state.isLoadingLogin = false;
				state.errorLogin = false;
			})
			.addCase(fetchLogin.pending, (state) => {
				state.isLogin = false;
				state.isLoadingLogin = true;
				state.errorLogin = false;
			})
			.addCase(fetchLogin.rejected, (state, action) => {
				state.isLogin = false;
				state.isLoadingLogin = false;
				state.errorLogin = true;
				state.errorMessageLogin =
					action.error.message || 'Произошла неизвестная ошибка';
				console.log(action.error); // вывести описание ошибки
			})
			// получение данных пользователя
			.addCase(fetchUserInfo.fulfilled, (state, action) => {
				state.userData = action.payload;
				state.isLoadingUser = false;
				state.errorUser = false;
			})
			.addCase(fetchUserInfo.pending, (state) => {
				state.isLoadingUser = true;
				state.errorUser = false;
			})
			.addCase(fetchUserInfo.rejected, (state, action) => {
				state.isLoadingUser = false;
				state.errorUser = true;
				state.errorMessageUser =
					action.error.message || 'Произошла неизвестная ошибка';
			})
			// изменение данных пользователя
			.addCase(fetchEditUserInfo.fulfilled, (state, action) => {
				state.userData = action.payload;
				state.isUserDataEditing = false;
				state.isLoadingUserData = false;
				state.errorEditUserData = false;
				state.errorMessageEditUserData = '';
			})
			.addCase(fetchEditUserInfo.pending, (state) => {
				state.isLoadingUserData = true;
				state.errorEditUserData = false;
			})
			.addCase(fetchEditUserInfo.rejected, (state, action) => {
				state.isLoadingUserData = false;
				state.errorEditUserData = true;
				state.errorMessageEditUserData =
					action.error.message ||
					'Произошла неизвестная ошибка при изменении данных пользователя';
			})
			.addCase(fetchNewPassword.fulfilled, (state, action) => {
				state.userData = action.payload;
				// state.userPassword = action.payload;
				state.isPasswordEditing = false;
				state.isLoadingPassword = false;
				state.errorEditPassword = false;
				state.errorMessageEditPassword = '';
			})
			.addCase(fetchNewPassword.pending, (state) => {
				state.isLoadingPassword = true;
				state.errorEditPassword = false;
			})
			.addCase(fetchNewPassword.rejected, (state, action) => {
				state.isPasswordEditing = false;
				state.isLoadingPassword = false;
				state.errorEditPassword = true;
				state.errorMessageEditPassword =
					action.error.message ||
					'Произошла неизвестная ошибка при изменении пароля';
			})
			.addCase(fetchDeleteProfile.fulfilled, (state) => {
				state.userData = null;
				state.isLogin = false;
				state.isLoadingDeleteProfile = false;
				state.errorDeleteProfile = false;
			})
			.addCase(fetchDeleteProfile.pending, (state) => {
				state.isLoadingDeleteProfile = true;
				state.errorDeleteProfile = false;
			})
			.addCase(fetchDeleteProfile.rejected, (state, action) => {
				state.isLoadingDeleteProfile = false;
				state.errorDeleteProfile = true;
				state.errorMessageDeleteProfile =
					action.error.message ||
					'Произошла неизвестная ошибка при удалении профиля';
			});
	},
});

export const {
	setAuthTrue,
	setAuthFalse,
	setAuthInitializing,
	setIsUserDataEditingTrue,
	setIsUserDataEditingFalse,
	setIsPasswordEditingTrue,
	setIsPasswordEditingFalse,
	clearLoginError,
	clearEditUserDataError,
} = userSlice.actions;
export default userSlice.reducer;

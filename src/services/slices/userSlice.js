import { createSlice } from '@reduxjs/toolkit';
import {
	fetchLogin,
	fetchUserInfo,
	fetchEditUserInfo,
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
	isLoadingUser: false,
	errorUser: false,
	errorMessageUser: '',
	// Сheck User Auth
	isUserAuth: false,
	// Edit User Data
	isUserDataEditing: false, // состояние редактирования
	isLoadingUserData: false, // загрузка/обновление данных
	errorEditUserData: false,
	errorMessageEditUserData: '',
};

const authUserSlise = createSlice({
	name: 'authUser',
	initialState,
	// reducers используется для изменения состояния (напоминает второй аргумент в хуке useState)
	reducers: {
		setAuthTrue: (state) => {
			state.isUserAuth = true;
		},
		setAuthFalse: (state) => {
			state.isUserAuth = false;
			state.userData = null;
		},
		setIsUserDataEditingTrue: (state) => {
			state.isUserDataEditing = true;
		},
		setIsUserDataEditingFalse: (state) => {
			state.isUserDataEditing = false;
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
				state.isUserDataEditing = false;
				state.isLoadingUserData = false;
				state.errorEditUserData = true;
				state.errorMessageEditUserData =
					action.error.message ||
					'Произошла неизвестная ошибка при изменении данных пользователя';
			});
	},
});

export const {
	setAuthTrue,
	setAuthFalse,
	setIsUserDataEditingTrue,
	setIsUserDataEditingFalse,
} = authUserSlise.actions;
export default authUserSlise.reducer;

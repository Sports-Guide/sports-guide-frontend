import { RootState } from '../store';

export const getIsUserAuth = (state: RootState) => state.user.isUserAuth;
export const getIsLogin = (state: RootState) => state.user.isLogin;
export const getUserInfo = (state: RootState) => state.user.userData;
export const getIsUserDataEditing = (state: RootState) =>
	state.user.isUserDataEditing;
// export const getIsPasswordEditing = (state) => state.user.isPasswordEditing;
export const getAuthInitializationStatus = (state: RootState) =>
	state.user.isAuthInitialized;
// прописать ошибки для инпутов

export const getIsErrorLogin = (state: RootState) => state.user.errorLogin;
export const getErrorMessageLogin = (state: RootState) =>
	state.user.errorMessageLogin;
export const getIsErrorEditUserData = (state: RootState) =>
	state.user.errorEditUserData;
export const getErrorMessageEditUserData = (state: RootState) =>
	state.user.errorMessageEditUserData;

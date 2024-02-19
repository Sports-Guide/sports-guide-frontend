export const getIsUserAuth = (state) => state.user.isUserAuth;
export const getIsLogin = (state) => state.user.isLogin;
export const getUserInfo = (state) => state.user.userData;
export const getIsUserDataEditing = (state) => state.user.isUserDataEditing;
export const getIsPasswordEditing = (state) => state.user.isPasswordEditing;
export const getAuthInitializationStatus = (state) =>
	state.user.isAuthInitialized;
// прописать ошибки для инпутов

export const getIsErrorLogin = (state) => state.user.errorLogin;
export const getErrorMessageLogin = (state) => state.user.errorMessageLogin;
export const getIsErrorEditUserData = (state) => state.user.errorEditUserData;
export const getErrorMessageEditUserData = (state) =>
	state.user.errorMessageEditUserData;
export const getIsErrorEditPassword = (state) => state.user.errorEditPassword;
export const getErrorMessageEditPassword = (state) =>
	state.user.errorMessageEditPassword;

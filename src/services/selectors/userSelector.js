export const getIsUserAuth = (state) => state.user.isUserAuth;
export const getIsLogin = (state) => state.user.isLogin;
export const getUserInfo = (state) => state.user.userData;
export const getIsUserDataEditing = (state) => state.user.isUserDataEditing;
export const getAuthInitializationStatus = (state) =>
	state.user.isAuthInitialized;
// прописать ошибки для инпутов

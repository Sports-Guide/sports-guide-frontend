export const getIsUserAuth = (state) => state.authUser.isUserAuth;
export const getIsLogin = (state) => state.authUser.isLogin;
export const getUserInfo = (state) => state.authUser.userData;
export const getIsUserDataEditing = (state) => state.authUser.isUserDataEditing;
export const getIsPasswordEditing = (state) => state.authUser.isPasswordEditing;
export const getAuthInitializationStatus = (state) =>
	state.user.isAuthInitialized;
// прописать ошибки для инпутов

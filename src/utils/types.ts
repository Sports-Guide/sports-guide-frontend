export type TUserData = {
	id: number;
	nickname: string;
	email: string;
	photo: string;
};

export type TUserState = {
	isLogin: boolean;
	isLoadingLogin: boolean;
	errorLogin: boolean;
	errorMessageLogin: string;
	userData: TUserData | null;
	isLoadingUser: boolean;
	errorUser: boolean;
	errorMessageUser: string;
	isUserAuth: boolean;
	isAuthInitialized: boolean;
	isUserDataEditing: boolean;
	isLoadingUserData: boolean;
	errorEditUserData: boolean;
	errorMessageEditUserData: string;
	isPhotoLoading: boolean;
	errorUploadPhoto: boolean;
	errorMessageUploadPhoto: string;
	isLoadingDeleteProfile: boolean;
	errorDeleteProfile: boolean;
	errorMessageDeleteProfile: string;
};

export type TPopupType =
	| 'login'
	| 'register'
	| 'successSentActivation'
	| 'passwordRecovery'
	| 'passwordRecoverySuccessSent'
	| 'passwordReset'
	| 'logout'
	| 'deleteProfile'
	| 'createAreasSuccess'
	| 'createAreasError'
	| 'getAreasError'
	| 'getCategoryError'
	| 'coordsForAreaError'
	| 'informActivation'
	| null;

export type TModalState = {
	isOpen: boolean;
	type: TPopupType | null;
};

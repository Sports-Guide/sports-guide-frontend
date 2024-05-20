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

// AreaSlice

export type Coordinates = [number, number];

export type CoordinatesArray = Coordinates[];

interface Author {
	id: number;
	nickname: string;
	email: string;
}

interface Category {
	id: number;
	name: string;
	slug?: string;
	icon?: string;
}

interface Image {
	id: number;
	url: string;
}

export interface SportGround {
	id: number;
	name: string;
	address: string;
	author: Partial<Author>;
	categories: Partial<Category>[];
	description: string;
	images: Image[];
	is_favorited: boolean;
	latitude: string;
	longitude: string;
	moderation_status: string;
}

export type SportGrounds = SportGround[];

export type Categories = Category[];

interface AuthorComment {
	id: number;
	nickname?: string;
	photo?: string;
}

export interface Comments {
	id: number;
	author: AuthorComment;
	area: number;
	comment: string;
	date_added: string;
}

export interface AddAreaRequestData {
	address: string;
	description: string;
	latitude: string;
	longitude: string;
	categories: string;
	images: File[];
}

export type TAreaState = {
	address: string;
	coordinates: CoordinatesArray;
	areasToShow: SportGrounds;
	isAreaAdded: boolean;
	isAreaLoading: boolean;
	isAreaError: boolean;
	errorMessageAddArea: string;
	areasList: SportGrounds;
	isLoadingGetAreas: boolean;
	errorGetAreas: boolean;
	errorMessageGetAreas: string;
	categoryList: Categories;
	isLoadingGetCategory: boolean;
	errorGetCategory: boolean;
	errorMessageGetCategory: string;
	isVerified: boolean;
	areaInfo: Comments | null;
	isLoadingAreaInfo: boolean;
	errorAreaInfo: boolean;
	errorMessageAreaInfo: string;
};

// favoriteAreasSlice

export type TFavoriteAreaState = {
	favoriteAreasList: SportGrounds;
	isLoadingGetFavoriteAreas: boolean;
	errorGetFavoriteAreas: boolean;
	errorMessageFavoriteAreas: string;
	isLoadingAddToFavoriteAreas: boolean;
	errorAddToFavoriteAreas: boolean;
	isLoadingDeleteFromFavoriteAreas: boolean;
	errorDeleteFromFavoriteAreas: boolean;
	myAreasList: SportGrounds;
	isLoadingGetMyAreas: boolean;
	errorGetMyAreas: boolean;
	errorMessageMyAreas: string;
};

export interface TCoordsForAreaState {
	coordsForArea: number[][];
	isLoadingcoordsForArea: boolean;
	errorCoordsForArea: boolean;
	errorMessageCoordsForArea: string;
}

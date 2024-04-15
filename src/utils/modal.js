import FormLogin from '../components/Forms/FormLogin';
import FormRegister from '../components/Forms/FormRegister';
import FormPasswordRecovery from '../components/Forms/FormPasswordRecovery';
import FormPasswordResetModal from '../components/Forms/FormPasswordResetModal';
import FormLogOut from '../components/Forms/FormLogOut';
import FormDeleteProfile from '../components/Forms/FormDeleteProfile';
import ViewSuccessSentActivation from '../components/Popup/ViewSuccessSentActivation';
import ViewSuccessSentPasswordRecovery from '../components/Popup/ViewSuccessSentPasswordRecovery';
import ViewSuccessCreateArea from '../components/Popup/ViewSuccessCreateArea';
import ViewInformActivation from '../components/Popup/ViewInformActivation';
import ViewGetError from '../components/Popup/ViewGetAreasError';

export const getTitleByType = (type) => {
	switch (type) {
		case 'login': // type popup
			return 'Вход'; // главный заголовок
		case 'register':
			return 'Регистрация';
		case 'successSentActivation':
			return 'Регистрация';
		case 'passwordRecovery':
			return 'Восстановление пароля';
		case 'passwordRecoverySuccessSent':
			return 'Восстановление пароля';
		case 'passwordReset':
			return 'Сброс пароля';
		case 'logout':
			return 'Выход из профиля';
		case 'deleteProfile':
			return 'Удаление профиля';
		case 'createAreasSuccess':
			return 'Отправлено на проверку';
		case 'createAreasError':
			return 'Произошла ошибка при добавлении площадки';
		case 'getAreasError':
			return 'Ошибка при получении площадок';
		case 'getCategoryError':
			return 'Ошибка при получении категорий площадок';
		case 'coordsForAreaError':
			return 'Ошибка при получении границ округа';
		default:
			return '';
	}
};

export const getTitleStyleByType = (type) => {
	switch (type) {
		case 'successSentActivation': // type popup
			return 'popup__title-left'; // стиль для заголовка(если отличается от дефолтного)
		case 'passwordRecoverySuccessSent':
			return 'popup__title-left';
		case 'passwordRecovery':
			return 'popup__title-left';
		case 'passwordReset':
			return 'popup__title-left';
		case 'logout':
			return 'popup__title-left';
		case 'deleteProfile':
			return 'popup__title-left';
		default:
			return '';
	}
};

export const getContentByType = (type, handleClose) => {
	switch (type) {
		case 'login':
			return <FormLogin handleClose={handleClose} />; // то что передается во внутрь попапа
		case 'register':
			return <FormRegister />;
		case 'passwordRecovery':
			return <FormPasswordRecovery handleClose={handleClose} />;
		case 'passwordReset':
			return <FormPasswordResetModal handleClose={handleClose} />;
		case 'logout':
			return <FormLogOut handleClose={handleClose} />;
		case 'deleteProfile':
			return <FormDeleteProfile handleClose={handleClose} />;
		case 'successSentActivation':
			return <ViewSuccessSentActivation handleClose={handleClose} />;
		case 'passwordRecoverySuccessSent':
			return <ViewSuccessSentPasswordRecovery handleClose={handleClose} />;
		case 'createAreasSuccess':
			return <ViewSuccessCreateArea handleClose={handleClose} />;
		case 'createAreasError':
			return <ViewGetError handleClose={handleClose} />;
		case 'informActivation':
			return <ViewInformActivation handleClose={handleClose} />;
		case 'getAreasError':
			return <ViewGetError handleClose={handleClose} />;
		case 'getCategoryError':
			return <ViewGetError handleClose={handleClose} />;
		case 'coordsForAreaError':
			return <ViewGetError handleClose={handleClose} />;

		default:
			return null;
	}
};

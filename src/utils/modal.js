import FormLogin from '../components/Forms/FormLogin';
import FormRegister from '../components/Forms/FormRegister';
import FormPasswordRecovery from '../components/Forms/FormPasswordRecovery';
import FormPasswordResetModal from '../components/Forms/FormPasswordResetModal';
import FormLogOut from '../components/Forms/FormLogOut';
import FormDeleteProfile from '../components/Forms/FormDeleteProfile';
import ViewSuccessSentActivation from '../components/Popup/ViewSuccessSentActivation';
import ViewSuccessSentPasswordRecovery from '../components/Popup/ViewSuccessSentPasswordRecovery';
import ViewSuccessCreateArea from '../components/Popup/ViewSuccessCreateArea';

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

		default:
			return null;
	}
};

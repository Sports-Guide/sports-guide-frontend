import FormLogin from '../components/Forms/FormLogin';
import FormRegister from '../components/Forms/FormRegister';
import FormPasswordRecovery from '../components/Forms/FormPasswordRecovery';
import FormPasswordReset from '../components/Forms/FormPasswordReset';
import ViewSuccessSentActivation from '../components/Popup/ViewSuccessSentActivation';
import ViewSuccessSentPasswordRecovery from '../components/Popup/ViewSuccessSentPasswordRecovery';

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
			return <FormPasswordReset handleClose={handleClose} />;
		case 'successSentActivation':
			return <ViewSuccessSentActivation handleClose={handleClose} />;
		case 'passwordRecoverySuccessSent':
			return <ViewSuccessSentPasswordRecovery handleClose={handleClose} />;
		default:
			return null;
	}
};

import FormLogin from '../components/Forms/FormLogin';
import FormRegister from '../components/Forms/FormRegister';
import FormPasswordRecovery from '../components/Forms/FormPasswordRecovery';

export const getTitleByType = (type) => {
	switch (type) {
		case 'login': // type popup
			return 'Вход'; // главный заголовок
		case 'register':
			return 'Регистрация';
		case 'passwordRecovery':
			return 'Восстановление пароля';
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
			return <FormRegister handleClose={handleClose} />;
		case 'passwordRecovery':
			return <FormPasswordRecovery handleClose={handleClose} />;
		default:
			return null;
	}
};

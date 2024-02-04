import FormLogin from '../components/Forms/FormLogin';
import FormRegister from '../components/Forms/FormRegister';
import FormPasswordRecovery from '../components/Forms/FormPasswordRecovery';

export const getTitleByType = (type) => {
	switch (type) {
		case 'login':
			return 'Вход';
		case 'register':
			return 'Регистрация';
		case 'passwordRecovery':
			return 'Восстановление пароля';
		default:
			return '';
	}
};

export const getContentByType = (type, handleClose) => {
	switch (type) {
		case 'login':
			return <FormLogin onClose={handleClose} />;
		case 'register':
			return <FormRegister />;
		case 'passwordRecovery':
			return <FormPasswordRecovery />;
		default:
			return null;
	}
};

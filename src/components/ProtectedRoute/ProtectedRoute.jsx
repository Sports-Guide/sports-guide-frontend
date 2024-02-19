import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	getAuthInitializationStatus,
	getIsUserAuth,
} from '../../services/selectors/userSelector';

const ProtectedOnlyAuth = ({ component }) => {
	const isUserAuth = useSelector(getIsUserAuth);
	const isAuthInitialized = useSelector(getAuthInitializationStatus);

	// проверяем начался ли процесс проверки: авторизован ли юзер - нужно чтобы в момент выполнения асинхронных запросов не срабатывала состояние isUserAuth=false и пользователя не редиректило на домашнюю страницу
	if (!isAuthInitialized) {
		return null;
	}

	// после проверки если пользователь не авторизован но находится на защищенном роуте - отправляем его на домашнюю страницу
	if (!isUserAuth) {
		return <Navigate to="/" />;
	}

	// если пользователь авторизован
	return component;
};

export default ProtectedOnlyAuth;

ProtectedOnlyAuth.propTypes = {
	component: PropTypes.element.isRequired,
};

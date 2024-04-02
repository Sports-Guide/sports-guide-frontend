import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ViewInformActivation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonOld } from '../Button/ButtonOld';
import { openModal } from '../../services/slices/modalSlice';

export default function ViewInformActivation({ handleClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoadingUserActivation = useSelector(
		(state) => state.registerUser.isLoadingUserActivation
	);
	const isUserActivation = useSelector(
		(state) => state.registerUser.isUserActivation
	);
	const errorUserActivation = useSelector(
		(state) => state.registerUser.errorUserActivation
	);

	const errorMessageUserActivation = useSelector(
		(state) => state.registerUser.errorMessageUserActivation
	);

	const isLoadingLogin = useSelector((state) => state.user.isLoadingLogin);

	useEffect(() => {
		navigate('/');
	}, [dispatch, handleClose, navigate]);

	return (
		<>
			{isLoadingUserActivation && <p className="message__text">Активация...</p>}
			{isUserActivation && (
				<>
					<p className="message__text">Регистрация прошла успешно</p>
					<ButtonOld
						className="view-form__button-signin"
						type="button"
						label={isLoadingLogin ? 'Вход...' : 'Войти'}
						onClick={() => dispatch(openModal('login'))}
					/>
				</>
			)}
			{errorUserActivation && (
				<p className="message__text message__text-error">
					Ошибка активации: {errorMessageUserActivation}
				</p>
			)}
		</>
	);
}

ViewInformActivation.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

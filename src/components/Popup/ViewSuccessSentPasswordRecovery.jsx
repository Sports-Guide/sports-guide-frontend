import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ViewSuccessSentActivation.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonOld } from '../Button/ButtonOld';
import { setIsSentEmail } from '../../services/slices/resetPasswordSliсe';

export default function ViewSuccessSentPasswordRecovery({ handleClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const email = useSelector((state) => state.resetPassword.email);
	const text = `Письмо со ссылкой для восстановления пароля отправлено на ${email}.`;

	const navigateHome = () => {
		navigate('/');
		handleClose();
	};

	useEffect(() => {
		dispatch(setIsSentEmail(false));
	}, [dispatch, handleClose]);

	return (
		<div className="view__container">
			<p className="view__text">{text}</p>
			<ButtonOld
				className="view__button-navigate-home"
				type="button"
				onClick={navigateHome}
				label="На главную"
			/>
		</div>
	);
}

ViewSuccessSentPasswordRecovery.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

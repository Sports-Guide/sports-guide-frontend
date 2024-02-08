import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ViewSuccessSentActivation.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Button/Button';
import { setIsSentEmail } from '../../services/slices/resetPasswordSliсe';

export default function ViewSuccessSentPasswordRecovery({ handleClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const email = useSelector((state) => state.resetPassword.email);
	const text = `Письмо успешно отправлено на ${email}.`;

	const navigateHome = () => {
		navigate('/');
		handleClose();
	};

	useEffect(() => {
		dispatch(setIsSentEmail(false));
	}, [dispatch, handleClose]);

	return (
		<>
			<p className="popup__text">{text}</p>
			<Button
				className="register-form__button-register popup__button-y"
				type="button"
				onClick={navigateHome}
				label="На главную"
			/>
		</>
	);
}

ViewSuccessSentPasswordRecovery.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

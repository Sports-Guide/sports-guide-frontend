import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ViewSuccessSentActivation.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Button/Button';
import { setIsRegister } from '../../services/slices/registerUserSliсe';

export default function ViewSuccessSentActivation({ handleClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const email = useSelector((state) => state.registerUser.email);
	const text = `Письмо со ссылкой для подтверждения регистрации отправлено на ${email}.`;

	const navigateHome = () => {
		navigate('/');
		handleClose();
	};

	useEffect(() => {
		dispatch(setIsRegister(false));
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

ViewSuccessSentActivation.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

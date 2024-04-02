import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ViewSuccessSentActivation.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonOld } from '../Button/ButtonOld';
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

ViewSuccessSentActivation.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

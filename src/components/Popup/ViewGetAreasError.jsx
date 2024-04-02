import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ViewSuccessSentActivation.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ButtonOld } from '../Button/ButtonOld';
import { setIsRegister } from '../../services/slices/registerUserSliсe';

export default function ViewGetError({ handleClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const text = `Произошла ошибка на сервере. Попробуйте перезагрузить страницу либо вернитесь позже.`;

	const navigateHome = () => {
		navigate('/');
		handleClose();
	};

	useEffect(() => {
		dispatch(setIsRegister(false));
	}, [dispatch, handleClose]);

	return (
		<>
			<p className="popup__text popup__text_type_areas">{text}</p>
			<ButtonOld
				className="register-form__button-register popup__button-y"
				type="button"
				onClick={navigateHome}
				label="На главную"
			/>
		</>
	);
}

ViewGetError.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

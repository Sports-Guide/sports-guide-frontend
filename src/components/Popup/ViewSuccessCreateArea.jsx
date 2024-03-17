import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ViewSuccessSentActivation.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import { setIsRegister } from '../../services/slices/registerUserSliсe';

export default function ViewSuccessCreateArea({ handleClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const text = `Как только площадка пройдет проверку, она будет доступна для
	всех пользователей.`;

	const navigateHome = () => {
		navigate('/');
		handleClose();
	};

	useEffect(() => {
		dispatch(setIsRegister(false));
	}, [dispatch, handleClose]);

	useEffect(() => {
		if (handleClose) {
			navigate('/');
		}
	}, [handleClose, navigate]);

	return (
		<>
			<p className="popup__text popup__text_type_areas">{text}</p>
			<Button
				className="register-form__button-register popup__button-y"
				type="button"
				onClick={navigateHome}
				label="Жду, не дождусь"
			/>
		</>
	);
}

ViewSuccessCreateArea.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

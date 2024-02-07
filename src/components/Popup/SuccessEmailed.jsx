import React from 'react';
import PropTypes from 'prop-types';
import './SuccessEmailed.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';

export default function SuccessEmailed({ message, email, handleClose }) {
	const text = `${message} ${email}.`;

	const navigate = useNavigate();
	const navigateHome = () => {
		navigate('/');
		handleClose();
	};

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

SuccessEmailed.propTypes = {
	message: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	handleClose: PropTypes.func.isRequired,
};

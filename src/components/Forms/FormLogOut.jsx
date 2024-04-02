import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthFalse } from '../../services/slices/userSlice';
import { ButtonOld } from '../Button/ButtonOld';
import { closeModal } from '../../services/slices/modalSlice';
import './FormLogOut.scss';

export default function FormLogOut({ handleClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogOutSubmit = useCallback(() => {
		localStorage.clear();
		// localStorage.removeItem('accessToken');
		// localStorage.removeItem('refreshToken');
		setAuthFalse();
		dispatch(closeModal());
		navigate('/', { replace: true });
	}, [navigate, dispatch]);

	return (
		<div className="logout-form__container">
			<Formik onSubmit={handleLogOutSubmit}>
				{() => (
					<Form noValidate className="logout-form-container">
						<div className="popup__button-container">
							<ButtonOld
								className="popup__button popup__button-y"
								type="button"
								label="Выйти"
								onClick={handleLogOutSubmit}
							/>
							<ButtonOld
								className="popup__button popup__button-n"
								type="button"
								label="Отмена"
								onClick={handleClose}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

FormLogOut.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

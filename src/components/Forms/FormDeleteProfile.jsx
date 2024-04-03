import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDeleteProfile } from '../../services/thunks/userThunk';
import { closeModal } from '../../services/slices/modalSlice';
import { setAuthFalse } from '../../services/slices/userSlice';
import { Button } from '../Button/Button';
import './FormDeleteProfile.scss';

export default function FormDeleteProfile({ handleClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogOutSubmit = useCallback(() => {
		dispatch(
			fetchDeleteProfile({
				token: localStorage.getItem('accessToken'),
			})
		)
			.then((res) => {
				if (res.statusCode === 204 || 200) {
					setAuthFalse();
					localStorage.clear();
					dispatch(closeModal());
					navigate('/', { replace: true });
				}
			})
			.catch((err) => {
				console.log(`Ошибка при удалении профиля`, err);
			});
	}, [navigate, dispatch]);

	return (
		<div className="delete-profile-form__container">
			<Formik onSubmit={handleLogOutSubmit}>
				{() => (
					<Form noValidate className="delete-profile-form-container">
						<span className="delete-profile-form__error" />
						<div className="popup__button-container">
							<Button
								customStyle="popup__button popup__button-y"
								type="button"
								label="Удалить"
								ariaLabel="Кнопка подтверждения удаления профиля"
								onClick={handleLogOutSubmit}
							/>
							<Button
								customStyle="popup__button popup__button-n"
								type="button"
								label="Отмена"
								ariaLabel="Кнопка отмены удаления профиля и закрытия модального окна"
								onClick={handleClose}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

FormDeleteProfile.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

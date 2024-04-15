import { Formik, Form } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './FormPasswordRecovery.scss';
import './FormPasswordResetModal.scss';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../services/slices/modalSlice';
import { getUserInfo } from '../../services/selectors/userSelector';
import { ButtonOld } from '../Button/ButtonOld';
import { fetchUserInfo } from '../../services/thunks/userThunk';

export default function FormPasswordResetModal() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(getUserInfo);
	const email = user?.email;
	const atIndex = email.indexOf('@'); // находим позицию символа "@"
	const hiddenEmail = `${email.charAt(0)}***${email.substring(atIndex)}`; // скрываем часть адреса почты

	useEffect(() => {
		dispatch(fetchUserInfo());
	}, [dispatch]);

	const handleNavigateHome = () => {
		dispatch(closeModal());
		navigate('/', { replace: true });
	};

	return (
		<div className="password-recovery-form__container">
			<Formik
				initialValues={{
					Email: '',
				}}
				onSubmit={handleNavigateHome}
			>
				{() => (
					<Form noValidate className="password-reset-form">
						<p className="password-reset-form__text">
							Письмо успешно отправлено на {hiddenEmail}.
						</p>
						<span className="password-reset-form__error">
							{/* {'ошибка от сервера' || ''} */}
						</span>
						<ButtonOld
							className="password-reset-form__button"
							type="button"
							label="На главную"
							onClick={handleNavigateHome}
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
}

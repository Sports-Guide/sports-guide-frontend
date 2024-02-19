import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useFormikContext } from 'formik';
import InputPassword from '../Inputs/InputPassword';
import { fetchConfirmPasswordReset } from '../../services/thunks/resetPasswordThunk';
import { openModal } from '../../services/slices/modalSlice';
import { clearConfirmPasswordError } from '../../services/slices/resetPasswordSliсe';
import './FormPasswordResetPage.scss';
import { getIsUserAuth } from '../../services/selectors/userSelector';

export const FormPasswordResetPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isConfirmPassword = useSelector(
		(state) => state.resetPassword.isConfirmPassword
	);
	const { uid, token } = useParams();
	const isUserAuth = useSelector(getIsUserAuth);

	const validate = (values) => {
		const errors = {};
		if (values.newPassword !== values.confirmPassword) {
			errors.confirmPassword = 'Пароли не совпадают';
		}
		return errors;
	};

	const navigateHome = () => {
		navigate('/');
	};

	const handleSubmit = (values) => {
		dispatch(
			fetchConfirmPasswordReset({
				uid,
				token,
				new_password: values.newPassword,
			})
		);
	};

	return (
		<main className="reset-password-form__container">
			{isConfirmPassword ? (
				<div className="reset-password-form__success-container">
					<h2 className="reset-password-form__title">Пароль изменен</h2>
					<p>Установлен новый пароль для учетной записи</p>
					{isUserAuth ? (
						<button
							className="reset-password-form__button"
							type="button"
							onClick={navigateHome}
						>
							На главную
						</button>
					) : (
						<button
							className="reset-password-form__button"
							type="button"
							onClick={() => dispatch(openModal('login'))}
						>
							Войти
						</button>
					)}
				</div>
			) : (
				<Formik
					initialValues={{
						newPassword: '',
						confirmPassword: '',
					}}
					onSubmit={handleSubmit}
					validate={validate}
				>
					{() => <FormComponent />}
				</Formik>
			)}
		</main>
	);
};

export default FormPasswordResetPage;

function FormComponent() {
	const isLoadingConfirmPassword = useSelector(
		(state) => state.resetPassword.isLoadingConfirmPassword
	);
	const errorMessageConfirmPassword = useSelector(
		(state) => state.resetPassword.errorMessageConfirmPassword
	);

	const { values } = useFormikContext();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearConfirmPasswordError());
	}, [values, dispatch]);

	return (
		<Form noValidate className="reset-password-form">
			<h2 className="reset-password-form__title">Введите новый пароль</h2>
			<p className="reset-password-form__text">
				Новый пароль должен отличаться от текущего
			</p>
			<InputPassword labelText="Новый пароль" inputId="newPassword" />
			<InputPassword labelText="Повторите пароль" inputId="confirmPassword" />
			<span className="reset-password-form__server-error">
				{errorMessageConfirmPassword || ''}
			</span>
			<button className="reset-password-form__button" type="submit">
				{isLoadingConfirmPassword ? 'Отправка...' : 'Отправить'}
			</button>
		</Form>
	);
}

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useFormikContext } from 'formik';
import InputPassword from '../Inputs/InputPassword';
import { fetchConfirmPasswordReset } from '../../services/thunks/resetPasswordThunk';
import { openModal } from '../../services/slices/modalSlice';
import { clearConfirmPasswordError } from '../../services/slices/resetPasswordSliсe';
import './FormPasswordResetPage.scss';

export const FormPasswordResetPage = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const parts = pathname.split('/');
	const uid = parts[4];
	const token = parts[5];
	console.log(uid, token);

	const [step, setStep] = useState(1);

	const validate = (values) => {
		const errors = {};
		if (values.newPassword !== values.confirmPassword) {
			errors.confirmPassword = 'Пароли не совпадают';
		}
		return errors;
	};

	const handleSubmit = (values) => {
		if (step === 1) {
			if (values.newPassword === values.confirmPassword) {
				dispatch(
					fetchConfirmPasswordReset({
						uid,
						token,
						new_password: values.newPassword,
					})
				)
					.then((res) => {
						console.log(values.newPassword, values.confirmPassword);
						if (res.statusCode === 204 || 200) {
							setStep(2);
						}
					})
					.catch((err) => {
						console.log('Ошибка при смене пароля', err);
						setStep(1);
					})
					.finaly(() => {
						setStep(2);
					});
			}
		}
		if (step === 2) {
			// открыть логин
			dispatch(openModal('login'));
		}
	};

	return (
		<main className="reset-password-form__container">
			{step === 1 && (
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
			{step === 2 && (
				<div className="reset-password-form__success-container">
					<h2 className="reset-password-form__title">Пароль изменен</h2>
					<p>Установлен новый пароль для учетной записи</p>
					<button
						className="reset-password-form__button"
						type="button"
						onClick={() => dispatch(openModal('login'))}
					>
						Войти
					</button>
				</div>
			)}
		</main>
	);
};

export default FormPasswordResetPage;

function FormComponent() {
	const isLoadingConfirmPassword = useSelector(
		(state) => state.resetPassword.isLoadingConfirmPassword
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
			<button className="reset-password-form__button" type="submit">
				{isLoadingConfirmPassword ? 'Отправка...' : 'Отправить'}
			</button>
		</Form>
	);
}

import { Formik, Form, useFormikContext } from 'formik'; // https://formik.org/ - документация библиотеки formik
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './FormLogin.scss';
import React, { useCallback, useEffect } from 'react';
import { fetchLogin } from '../../services/thunks/userThunk';
import { Button } from '../Button/Button';
import { ButtonOnRegister } from '../Button/ButtonOnRegister';
import InputEmail from '../Inputs/InputEmail';
import InputPassword from '../Inputs/InputPassword';
import InputCheckbox from '../Inputs/InputCheckbox';
import { ButtonOnPasswordRecovery } from '../Button/ButtonOnPasswordRecovery';
import { openModal } from '../../services/slices/modalSlice';
import { clearLoginError } from '../../services/slices/userSlice';

export default function FormLogin({ handleClose }) {
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.user.isLogin);

	const handleSubmit = useCallback(
		(values) => {
			dispatch(fetchLogin({ email: values.Email, password: values.Password }));
		},
		[dispatch]
	);

	useEffect(() => {
		if (isLogin) {
			handleClose();
		}
	}, [isLogin, handleClose]);

	return (
		<div className="login-form__container">
			<Formik
				initialValues={{
					Email: '',
					Password: '',
					RememberMe: false,
				}}
				onSubmit={handleSubmit}
			>
				{() => <FormComponent />}
			</Formik>
			<p className="login-form__paragraph">
				Нет аккаунта?
				<ButtonOnRegister
					onClick={() => dispatch(openModal('register'))}
					label="Зарегистрироваться"
					type="button"
					disabled={false}
				/>
			</p>
		</div>
	);
}

FormLogin.propTypes = {
	handleClose: PropTypes.func.isRequired,
};

function FormComponent() {
	const dispatch = useDispatch();
	const isOpenModal = useSelector((state) => state.modal.isOpen);

	const isLoadingLogin = useSelector((state) => state.user.isLoadingLogin);
	const errorMessageLogin = useSelector(
		(state) => state.user.errorMessageLogin
	);
	const { values } = useFormikContext();

	useEffect(() => {
		dispatch(clearLoginError());
	}, [values, isOpenModal, dispatch]);

	return (
		<Form noValidate className="login-form">
			<InputEmail />
			<InputPassword labelText="Пароль" inputId="Password" />
			<div className="login-form__down_group">
				<InputCheckbox inputId="RememberMe">Запомнить меня</InputCheckbox>
				<ButtonOnPasswordRecovery
					onClick={() => dispatch(openModal('passwordRecovery'))}
					label="Забыли пароль?"
					type="button"
					disabled={false}
				/>
			</div>
			<span className="login-form__server-error">
				{errorMessageLogin || ''}
			</span>
			<Button
				className="login-form__button-signin"
				type="submit"
				label={isLoadingLogin ? 'Вход...' : 'Войти'}
			/>
		</Form>
	);
}

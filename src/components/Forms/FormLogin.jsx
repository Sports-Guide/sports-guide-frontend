import { Formik, Form } from 'formik'; // https://formik.org/ - документация библиотеки formik
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './FormLogin.scss';
import React, { useCallback, useEffect } from 'react';
import { fetchLogin } from '../../services/thunks/userThunk';
import { Button } from '../Button/Button';
import {
	getErrorMessageLogin,
	getIsLogin,
} from '../../services/selectors/userSelector';
import { ButtonOnRegister } from '../Button/ButtonOnRegister';
import InputEmail from '../Inputs/InputEmail';
import InputPassword from '../Inputs/InputPassword';
import InputCheckbox from '../Inputs/InputCheckbox';
import { ButtonOnPasswordRecovery } from '../Button/ButtonOnPasswordRecovery';
import { openModal } from '../../services/slices/modalSlice';
import { clearLoginError } from '../../services/slices/userSlice';

export default function FormLogin({ handleClose }) {
	const dispatch = useDispatch();
	const errorFetchLogin = useSelector(getErrorMessageLogin);
	const isLogin = useSelector(getIsLogin);
	const isOpenModal = useSelector((state) => state.modal.isOpen);

	const handleSubmit = useCallback(
		(values, { resetForm }) => {
			dispatch(
				fetchLogin({ email: values.Email, password: values.Password })
			).then(() => {
				if (isLogin) {
					resetForm();
					handleClose();
				}
			});
		},
		[dispatch, isLogin, handleClose]
	);

	useEffect(() => {
		dispatch(clearLoginError());
	}, [isOpenModal, dispatch]);

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
				{() => (
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
							{errorFetchLogin || ''}
						</span>
						<Button
							className="login-form__button-signin"
							type="submit"
							label="Войти"
						/>
					</Form>
				)}
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

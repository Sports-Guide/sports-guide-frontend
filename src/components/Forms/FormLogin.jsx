import { Formik, Form, useFormikContext } from 'formik'; // https://formik.org/ - документация библиотеки formik
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './FormLogin.scss';
import React, { useCallback, useEffect } from 'react';
import { fetchLogin } from '../../services/thunks/userThunk';
import { Button } from '../Button/Button';
import InputEmail from '../Inputs/InputEmail';
import InputPassword from '../Inputs/InputPassword';
import { openModal } from '../../services/slices/modalSlice';
import { clearLoginError } from '../../services/slices/userSlice';
import { fetchResendActivation } from '../../services/thunks/registerUserThunk';
import { setIsResendActivation } from '../../services/slices/registerUserSliсe';
import InputCheckboxLogin from '../Inputs/InputCheckboxLogin';

export default function FormLogin({ handleClose }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLogin = useSelector((state) => state.user.isLogin);
	const isResendActivation = useSelector(
		(state) => state.registerUser.isResendActivation
	);

	const handleSubmit = useCallback(
		(values) => {
			dispatch(fetchLogin({ email: values.Email, password: values.Password }));
		},
		[dispatch]
	);

	useEffect(() => {
		if (isLogin) {
			handleClose();
			navigate('/', { replace: true });
		}
	}, [isLogin, handleClose, navigate]);

	useEffect(() => {
		if (isResendActivation) {
			dispatch(openModal('successSentActivation'));
			dispatch(setIsResendActivation(false));
		}
	}, [isResendActivation, dispatch]);

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

			<Button
				onClick={() => dispatch(openModal('register'))}
				label="Зарегистрироваться"
				type="button"
				btnStyle="flat"
				size="big"
			/>
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

	const handleResendActivation = (e, { email }) => {
		e.preventDefault();
		dispatch(fetchResendActivation({ email }));
	};

	const { values } = useFormikContext();

	useEffect(() => {
		dispatch(clearLoginError());
	}, [values, isOpenModal, dispatch]);

	return (
		<Form noValidate className="login-form">
			<InputEmail />
			<InputPassword labelText="Пароль" inputId="Password" />
			<div className="login-form__down_group">
				<InputCheckboxLogin inputId="RememberMe">
					Запомнить меня
				</InputCheckboxLogin>
				<Button
					onClick={() => dispatch(openModal('passwordRecovery'))}
					label="Забыли пароль?"
					type="button"
					btnStyle="flat"
					size="big"
				/>
			</div>
			<div className="login-form__error-container">
				<span>{errorMessageLogin || ''}</span>
				{errorMessageLogin ===
					`Пожалуйста, активируйте вашу учетную запись, перейдя по ссылке в письме.` && (
					<Button
						customStyle="login-form__btn-resend-activate"
						onClick={(e) => handleResendActivation(e, { email: values.Email })}
						label="Отправить письмо повторно"
					/>
				)}
			</div>
			<Button
				additionalStyle="login-form__button-signin"
				btnStyle="primary"
				size="big"
				type="submit"
				label={isLoadingLogin ? 'Вход...' : 'Войти'}
			/>
		</Form>
	);
}

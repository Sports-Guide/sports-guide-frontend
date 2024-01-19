import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import '../Form/Form.scss';
import './Login.scss';
import { Popup } from '../Popup/Popup';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
// import { PasswordInputWithValidation } from '../PasswordInputWithValidation/PasswordInputWithValidation';
import { Button } from '../Button/Button';
import { ButtonOnPasswordRecovery } from '../Button/ButtonOnPasswordRecovery';
import { ButtonOnRegister } from '../Button/ButtonOnRegister';

function Login({
	isOnLogInPopUpOpen,
	onClose,
	toSignUpPopUp,
	onPasswordRecovery,
	logErrorMessage,
	onLogIn,
}) {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const navigate = useNavigate();

	// логика валидации поля email
	const validateEmail = (e) => {
		setEmail(e.target.value);
		if (e.target.value.length < 6 || e.target.value.length > 50) {
			setEmailError('E-mail должен содержать от 6 до 50 символов');
		} else {
			const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
			if (!emailRegex.test(e.target.value)) {
				setEmailError('Введите корректный email. Пример: user@mail.ru');
			} else {
				setEmailError('');
			}
		}
	};

	const validatePassword = (e) => {
		setPassword(e.target.value);
		if (e.target.value.length < 6 || e.target.value.length > 50) {
			setPasswordError('Пароль должен содержать от 6 до 50 символов');
		} else {
			const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/;
			if (!passwordRegex.test(e.target.value)) {
				setPasswordError('Пароль должен содержать только буквы и цифры');
			} else {
				setPasswordError('');
			}
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!emailError && !passwordError) {
			onLogIn(email, password);
			navigate('/');
		}
	};
	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	if (!emailError) {
	// 		onLogIn(email, password);
	// 		navigate('/');
	// 	}
	// };

	return (
		<main id="sign-in">
			<Popup isOpen={isOnLogInPopUpOpen} onClose={onClose} title="Вход">
				<Form className="popup__login-form" onSubmit={handleSubmit}>
					{/* <Form className="popup__login-form" onSubmit={handleSubmit}> */}
					{/* <FormTitle
label="Вход"
className="popup__login-form-title"
/> */}

					<Input
						labelClassName="login-email-label"
						inputClassName="login-password-input"
						label="E-mail"
						htmlFor="loginEmailInput"
						className="popup__login-form-input popup__login-form-input-email"
						onChange={validateEmail}
						value={email}
						type="email"
						name="email"
						maxLength="50"
						minLength="6"
						required
					>
						{emailError ? (
							<span className="login-password-error">{emailError}</span>
						) : null}
					</Input>
					<Input
						labelClassName="login-password-label"
						inputClassName="login-password-input"
						label="Пароль"
						htmlFor="loginPasswordInput"
						className="popup__login-form-input popup__login-form-input-password"
						onChange={validatePassword}
						value={password}
						type={showPassword ? 'text' : 'password'}
						name="password"
						maxLength="50"
						minLength="6"
						required
					>
						<button
							className="show-hide-btn-register"
							type="button"
							onClick={togglePasswordVisibility}
							aria-label="show-hide-password"
						/>
						{passwordError ? (
							<span className="login-password-error">{passwordError}</span>
						) : null}
					</Input>
					<div className="popup__login-form-down_group">
						<label
							className="popup__login-form-checkbox-text"
							htmlFor="rememberMe"
						>
							<input
								className="popup__login-form-checkbox"
								type="checkbox"
								id="rememberMe"
								name="rememberMe"
							/>
							Запомнить меня
						</label>
						<ButtonOnPasswordRecovery
							onClick={onPasswordRecovery}
							label="Забыли пароль?"
						/>
					</div>
					{/* тут будет валидация кнопки войти */}
					<span className="form__error form__error_login">
						{logErrorMessage}
					</span>
					<Button
						className="popup__login-form-button-signin"
						type="submit"
						label="Войти"
						// disabled={!isValid}
						onLogIn={onLogIn}
					/>
				</Form>
				<p className="popup__login-form-paragraph">
					Нет аккаунта?
					<ButtonOnRegister
						onClick={toSignUpPopUp}
						label="Зарегистрироваться"
					/>
				</p>
			</Popup>
		</main>
	);
}

Login.propTypes = {
	isOnLogInPopUpOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	toSignUpPopUp: PropTypes.func.isRequired,
	onPasswordRecovery: PropTypes.func.isRequired,
	logErrorMessage: PropTypes.string.isRequired,
	onLogIn: PropTypes.func.isRequired,
};

export default Login;

// другая валидация инпутов паролей
/* <PasswordInputWithValidation
	labelClassName="login-password-label"
	passwordBtnClassName="show-hide-btn-login"
	label="Пароль"
	htmlFor="loginPasswordInput"
	inputClassName="login-password-input"
	inputContainerClassName="login-password-input-container"
	errorClassName="login-password-error"
	name="loginPasswordInput"
	id="loginPasswordInput"
	control={control}
	rules={{
		required: 'Поле обязательно для заполнения',
		minLength: {
			value: 6,
			message: 'Минимальная длина пароля 6 символа',
		},
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/,
			message: "Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы и быть от 6 до 25 символов",
		}
	}}
	maxLength={25}
	required
/> */

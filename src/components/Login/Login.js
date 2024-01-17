import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import '../Form/Form.scss';
import './Login.scss';
import { Popup } from '../Popup/Popup';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { PasswordInputWithValidation } from '../PasswordInputWithValidation/PasswordInputWithValidation';
import { Button } from '../Button/Button';
import { ButtonOnPasswordRecovery } from '../Button/ButtonOnPasswordRecovery';
import { ButtonOnRegister } from '../Button/ButtonOnRegister';

function Login({
	isOnLogInPopUpOpen,
	onClose,
	toSignUpPopUp,
	onPasswordRecovery,
}) {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	// const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const {
		formState: { isValid },
		control,
	} = useForm({ mode: 'onChange' });

	// логика валидации поля email
	const validateEmail = (e) => {
		setEmail(e.target.value);
		if (e.target.value.length < 6 || e.target.value.length > 50) {
			setEmailError('E-mail должен содержать от 6 до 50 символов');
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(e.target.value)) {
				setEmailError('Введите корректный email. Пример: user@mail.ru');
			} else {
				setEmailError('');
			}
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!emailError) {
			/* onLogin(email, password); */
			navigate('/');
		}
	};

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
						label="E-mail"
						htmlFor="loginEmailInput"
						className="popup__login-form-input popup__login-form-input-email"
						onChange={validateEmail}
						value={email}
						type="email"
						name="email"
						maxLength="50"
						minLength="6"
					>
						{emailError ? (
							<span className="login-password-error">{emailError}</span>
						) : null}
					</Input>
					<PasswordInputWithValidation
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
								value: 2,
								message: 'Минимальная длина пароля 2 символа',
							},
							maxLength: {
								value: 25,
								message: 'Максимальная длина пароля 25 символов',
							},
						}}
					/>
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
					<Button
						className="popup__login-form-button-signin"
						type="submit"
						label="Войти"
						disabled={!isValid}
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
	/* onLogin: PropTypes.func.isRequired,
	
	 */
};

export default Login;

import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Form/Form.scss';
import './Register.scss';
import { Popup } from '../Popup/Popup';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
// import { PasswordInputWithValidation } from '../PasswordInputWithValidation/PasswordInputWithValidation';
import { Button } from '../Button/Button';
import { ButtonOnLoginPopUp } from '../Button/ButtonOnLoginPopUp';
import { InfoTooltip } from '../InfoTooltip/InfoTooltip';

function Register({
	isOnRegisterPopUpOpen,
	onClose,
	toSignInPopUp,
	regErrorMessage,
	onRegister,
	isInfoTooltipOpen,
	isSucceeded,
}) {
	const [nickname, setNickname] = useState('');
	const [email, setEmail] = useState('');
	const [nicknameError, setNicknameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setRegisterPasswordInput] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [passwordConfirmationError, setPasswordConfirmationError] =
		useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const navigate = useNavigate();

	// const {
	// 	handleSubmit,
	// 	formState: { isValid },
	// 	control,
	// 	getValues,
	// } = useForm({ mode: 'onChange' });

	const validateNickname = (e) => {
		setNickname(e.target.value);
		if (e.target.value.length < 2 || e.target.value.length > 20) {
			setNicknameError(
				'Никнейм должен быть не менее 2 и не более 20 символов, включать латинские буквы, может содержать цифры и другие символы'
			);
		} else {
			setNicknameError('');
		}
	};
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
		setRegisterPasswordInput(e.target.value);
		if (e.target.value.length < 6 || e.target.value.length > 50) {
			setPasswordError('Пароль должен содержать от 6 до 50 символов');
		} else {
			const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/;
			if (!passwordRegex.test(e.target.value)) {
				setPasswordError('Пароль должен содержать только буквы и цифры');
			} else {
				if (e.target.value.length < 6 || e.target.value.length > 50) {
					setPasswordError('Пароль должен содержать от 6 до 50 символов');
				}
				setPasswordError('');
			}
		}
	};

	const validatePasswordConfirmation = (e) => {
		setPasswordConfirmation(e.target.value);
		if (e.target.value.length < 6 || e.target.value.length > 50) {
			setPasswordConfirmationError(
				'Пароль должен содержать от 6 до 50 символов'
			);
		} else {
			const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/;
			if (!passwordRegex.test(e.target.value)) {
				setPasswordConfirmationError(
					'Пароль должен содержать только буквы и цифры'
				);
			} else {
				setPasswordConfirmationError('');
			}
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (
			!nicknameError &&
			!emailError &&
			!passwordError &&
			!passwordConfirmationError
		) {
			onRegister({ nickname, email, password, passwordConfirmation });
			navigate('/');
			console.log('all good');
		}
	};

	return (
		<main>
			<Popup
				isOpen={isOnRegisterPopUpOpen}
				onClose={onClose}
				title="Регистрация"
			>
				<Form className="popup__register-form" onSubmit={onSubmit} noValidate>
					<Input
						labelClassName="register-password-label"
						inputClassName="register-password-input"
						htmlFor="registerNicknameInput"
						label="Никнейм"
						className="popup__login-form-input popup__register-form-input-name"
						onChange={validateNickname}
						type="name"
						name="register-nickname"
						id="registerNicknameInput"
						value={nickname}
						placeholder=""
						minLength="2"
						maxLength="20"
						required
					>
						{nicknameError && (
							<span className="register-password-error">{nicknameError}</span>
						)}
					</Input>
					<Input
						labelClassName="register-password-label"
						inputClassName="register-password-input"
						htmlFor="registerEmailInput"
						label="E-mail"
						className="popup__login-form-input popup__register-form-input-email"
						onChange={validateEmail}
						type="email"
						name="register-email"
						id="registerEmailInput"
						value={email}
						placeholder=""
						minLength="6"
						maxLength="50"
						required
					>
						{emailError ? (
							<span className="register-password-error">{emailError}</span>
						) : null}
					</Input>
					<Input
						labelClassName="register-password-label"
						inputClassName="register-password-input"
						htmlFor="registerPasswordInput"
						label="Пароль"
						className="register-password-input"
						onChange={validatePassword}
						type={showPassword ? 'text' : 'password'}
						name="registerPasswordInput"
						id="registerPasswordInput"
						value={password}
						placeholder=""
						minLength="6"
						maxLength="25"
						required
					>
						<button
							className="show-hide-btn-register"
							type="button"
							onClick={togglePasswordVisibility}
							aria-label="show-hide-password"
						/>
						{passwordError ? (
							<span className="register-password-error">{passwordError}</span>
						) : null}
					</Input>
					<Input
						labelClassName="register-password-label"
						inputClassName="register-password-input"
						htmlFor="registerConfirmationPasswordInput"
						label="Повторите пароль"
						className="popup__login-form-input popup__register-form-input-password"
						// onChange={(e) => {
						// 	setPasswordConfirmation(e.target.value);
						// }}
						onChange={validatePasswordConfirmation}
						type={showConfirmPassword ? 'text' : 'password'}
						name="registerConfirmationPasswordInput"
						id="registerConfirmationPasswordInput"
						value={passwordConfirmation}
						placeholder=""
						minLength="6"
						maxLength="25"
						required
					>
						<button
							className="show-hide-btn-register"
							type="button"
							onClick={toggleConfirmPasswordVisibility}
							aria-label="show-hide-password"
						/>
						{passwordConfirmationError ? (
							<span className="register-password-error">
								{passwordConfirmationError}
							</span>
						) : null}
					</Input>
					<div className="popup__register-form-politicks">
						<input
							className="popup__register-form-checkbox"
							type="checkbox"
							id="politicks"
							name="politicks"
						/>
						<label
							className="popup__register-form-checkbox-text"
							htmlFor="politicks"
						>
							Я даю согласие на обработку персональных данных в соответствии с{' '}
							<span className="popup__register-form-politiks">
								Политикой в отношении обработки персональных данных
							</span>
						</label>
					</div>
					<span className="form__error form__error_register">
						{regErrorMessage}
					</span>
					<Button
						className="popup__register-form-button-signup"
						type="submit"
						label="Зарегистрироваться"
						disabled={false}
						onClick={() =>
							onRegister({ nickname, email, password, passwordConfirmation })
						}
					/>
				</Form>
				<p className="popup__register-form-paragraph">
					Уже есть аккаунт?
					<ButtonOnLoginPopUp
						onClick={toSignInPopUp}
						label="Войти"
						type="button"
						disabled={false}
					/>
				</p>
			</Popup>
			{isSucceeded ? (
				<InfoTooltip
					isInfoTooltipOpen={isInfoTooltipOpen}
					onInfoTooltipClose={onClose}
					successMessage="Вы зарегистрированы"
				>
					<p className="popup__title">Регистрация пройдена успешно.</p>
					<Button
						className="popup__button popup__button-y"
						type="button"
						onClick={onClose}
						label="Регистрация"
					/>
				</InfoTooltip>
			) : null}
		</main>
	);
}

Register.propTypes = {
	isOnRegisterPopUpOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	toSignInPopUp: PropTypes.func.isRequired,
	regErrorMessage: PropTypes.string.isRequired,
	onRegister: PropTypes.func.isRequired,
	isInfoTooltipOpen: PropTypes.bool.isRequired,
	isSucceeded: PropTypes.bool.isRequired,
	// onPasswordRecovery: PropTypes.func.isRequired,
};

export default Register;

// другая валидация инпутов паролей
/* <PasswordInputWithValidation
	labelClassName="register-password-label"
	passwordBtnClassName="show-hide-btn-login"
	label="Пароль"
	htmlFor="registerPasswordInput"
	inputClassName="register-password-input"
	inputContainerClassName="register-password-input-container"
	errorClassName="register-password-error"
	name="registerPasswordInput"
	id="registerPasswordInput"
	control={control}
	rules={{
		required: 'Поле обязательно для заполнения',
		minLength: {
			value: 6,
			message: 'Пароль должен быть не менее 6 символов',
		},
		pattern: {
			value: emailRegEx,
			message:
				'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
		},
	}}
	maxLength={25}
	required
/> */
/* <PasswordInputWithValidation
	labelClassName="register-password-label"
	passwordBtnClassName="show-hide-btn-login"
	label="Повторите пароль"
	htmlFor="registerConfirmationPasswordInput"
	inputClassName="register-password-input"
	inputContainerClassName="register-password-input-container"
	errorClassName="register-password-error"
	name="registerConfirmationPasswordInput"
	id="registerConfirmationPasswordInput"
	control={control}
	rules={{
		required: 'Поле обязательно для заполнения',
		minLength: {
			value: 6,
			message: 'Пароль должен быть не менее 6 символов',
		},
		pattern: {
			value: emailRegEx,
			message:
				'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
		},
		validate: (value) =>
			value === getValues('registerPasswordInput') ||
			'Пароли не совпадают',
	}}
	maxLength={25}
	required
/> */

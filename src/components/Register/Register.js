import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Form/Form.scss';
import './Register.scss';
import { Popup } from '../Popup/Popup';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { PasswordInputWithValidation } from '../PasswordInputWithValidation/PasswordInputWithValidation';
import { Button } from '../Button/Button';
import { ButtonOnLoginPopUp } from '../Button/ButtonOnLoginPopUp';

function Register({ isOnRegisterPopUpOpen, onClose, toSignInPopUp }) {
	const [nickname, setNickname] = useState('');
	const [email, setEmail] = useState('');
	const [nicknameError, setNicknameError] = useState('');
	const [emailError, setEmailError] = useState('');

	const navigate = useNavigate();

	const {
		handleSubmit,
		formState: { isValid },
		control,
		getValues,
	} = useForm({ mode: 'onChange' });

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
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(e.target.value)) {
				setEmailError('Введите корректный email. Пример: user@mail.ru');
			} else {
				setEmailError('');
			}
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		/* onRegister(nickname, email, password); */
		navigate('/');
	};

	const emailRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

	return (
		<main>
			<Popup
				isOpen={isOnRegisterPopUpOpen}
				onClose={onClose}
				title="Регистрация"
			>
				<Form
					className="popup__register-form"
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* <Form className="popup__register-form" onSubmit={handleSubmit}> */}
					<Input
						label="Никнейм"
						className="popup__login-form-input popup__register-form-input-name"
						onChange={validateNickname}
						type="name"
						name="nickname"
						value={nickname}
						minLength="2"
						maxLength="20"
					>
						{nicknameError ? (
							<span className="register-password-error">{nicknameError}</span>
						) : null}
					</Input>
					<Input
						label="E-mail"
						className="popup__login-form-input popup__register-form-input-email"
						onChange={validateEmail}
						type="email"
						name="email"
						value={email}
						minLength="2"
						maxLength="50"
					>
						{emailError ? (
							<span className="register-password-error">{emailError}</span>
						) : null}
					</Input>
					<PasswordInputWithValidation
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
					/>
					<PasswordInputWithValidation
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
					/>
					<div className="popup__register-form-politicks">
						<input
							className="popup__register-form-checkbox"
							type="checkbox"
							id="politicks"
							name="politicks"
						/>
						{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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

					<Button
						className="popup__register-form-button-signup"
						type="submit"
						label="Регистрация"
						disabled={!isValid}
					/>
				</Form>
				<p className="popup__register-form-paragraph">
					Уже есть аккаунт?
					<ButtonOnLoginPopUp onClick={toSignInPopUp} label="Войти" />
				</p>
			</Popup>
		</main>
	);
}

Register.propTypes = {
	isOnRegisterPopUpOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	toSignInPopUp: PropTypes.func.isRequired,

	/* onLogin: PropTypes.func.isRequired,
	onPasswordRecovery: PropTypes.func.isRequired,
	 */
};

export default Register;

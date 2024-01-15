import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Form/Form.scss';
import './Register.scss';
import { Popup } from '../Popup/Popup';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { Button } from '../Button/Button';
import { ButtonOnLoginPopUp } from '../Button/ButtonOnLoginPopUp';

function Register({ isOnRegisterPopUpOpen, onClose, toSignInPopUp }) {
	const [nickname, setNickname] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		/* onRegister(nickname, email, password); */
		navigate('/');
	};

	return (
		<main>
			<Popup
				isOpen={isOnRegisterPopUpOpen}
				onClose={onClose}
				title="Регистрация"
			>
				<Form className="popup__register-form" onSubmit={handleSubmit}>
					<Input
						label="Никнейм"
						className="popup__login-form-input popup__register-form-input-name"
						onChange={(e) => setNickname(e.target.value)}
						type="name"
						name="nickname"
						value={nickname}
						minLength="6"
						maxLength="20"
					/>
					<Input
						label="E-mail"
						className="popup__login-form-input popup__register-form-input-email"
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						name="email"
						value={email}
						minLength="6"
						maxLength="50"
					/>
					<PasswordInput
						label="Пароль"
						htmlFor="passwordInput"
						idName="passwordInput"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength="2"
						maxLength="25"
						/* errorMessage="Пароль должен быть не менее 6 символов, включать латинские буквы
в верхнем и нижнем регистре, может содержать цифры и другие символы" */
					/>
					<PasswordInput
						label="Повторите пароль"
						htmlFor="repeatPasswordInput"
						idName="repeatPasswordInput"
						name="repeat-password"
						value={password}
						minLength="2"
						maxLength="25"
						/* errorMessage="Пароли не совпадают" */
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

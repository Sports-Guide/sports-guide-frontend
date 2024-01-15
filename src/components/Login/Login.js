import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Form/Form.scss';
import './Login.scss';
import { Popup } from '../Popup/Popup';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { Button } from '../Button/Button';
import { ButtonOnPasswordRecovery } from '../Button/ButtonOnPasswordRecovery';
import { ButtonOnRegister } from '../Button/ButtonOnRegister';

function Login({ isOnLogInPopUpOpen, onClose, toSignUpPopUp }) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		/* onLogin(email, password); */
		navigate('/');
	};

	return (
		<main id="sign-in">
			<Popup isOpen={isOnLogInPopUpOpen} onClose={onClose} title="Вход">
				<Form className="popup__login-form" onSubmit={handleSubmit}>
					{/* <FormTitle
label="Вход"
className="popup__login-form-title"
/> */}

					<Input
						label="E-mail"
						className="popup__login-form-input popup__login-form-input-email"
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						name="email"
						value={email}
						minLength="6"
						maxLength="50"
					/>
					{/* тут будет валидация email */}
					<PasswordInput
						label="Пароль"
						htmlFor="passwordInput"
						idName="passwordInput"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength="2"
						maxLength="25"
						/* errorMessage="Неверный пароль" */
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
							/* onClick={onPasswordRecovery} */ label="Забыли пароль?"
						/>
					</div>
					{/* тут будет валидация кнопки войти */}
					<Button
						className="popup__login-form-button-signin"
						type="submit"
						label="Войти"
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
	/* onLogin: PropTypes.func.isRequired,
	onPasswordRecovery: PropTypes.func.isRequired,
	 */
};

export default Login;

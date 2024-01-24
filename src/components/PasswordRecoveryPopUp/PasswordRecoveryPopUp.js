import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../Form/Form.scss';
import './PasswordRecoveryPopUp.scss';
import { Popup } from '../Popup/Popup';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import FormTitle from '../FormTitle/FormTitle';

function PasswordRecoveryPopUp({
	isPasswordRecoveryPopUpOpen,
	onClose,
	isSendPasswordRecoveryPopUpOpen,
}) {
	const [email, setEmail] = React.useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		/* onRecovery(email); */
	};

	const navigate = useNavigate();

	return (
		<main>
			<Popup isOpen={isPasswordRecoveryPopUpOpen} onClose={onClose} title="">
				<FormTitle
					label="Восстановление пароля"
					className="popup__recovery-password-title"
				/>
				<h3 className="popup__recovery-password-subtitle">
					Пожалуйста, укажите e-mail, который был использован при регистрации
				</h3>
				<Form className="popup__recovery-password-form" onSubmit={handleSubmit}>
					<Input
						labelClassName="popup__recovery-password-form-label"
						inputClassName="popup__recovery-password-form-input"
						htmlFor="recoveryEmail"
						label="E-mail"
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						name="recoveryEmail"
						id="recoveryEmail"
						placeholder=""
						value={email}
						minLength="6"
						maxLength="50"
					/>
					<Button
						className="popup__recovery-password-button"
						type="submit"
						label="Восстановить"
						onClick={onClose} // заменить на функцию восставновления пароля
					/>
				</Form>
			</Popup>
			<Popup
				isOpen={isSendPasswordRecoveryPopUpOpen}
				onClose={onClose}
				title=""
			>
				<h2 className="popup__recovery-password-title">
					Восстановление пароля
				</h2>
				<h3 className="popup__recovery-password-subtitle">
					Ваш пароль был отправлен на указанный адрес электронной почты. Письмо
					могло попасть в спам.
				</h3>
				<Button
					className="popup__recovery-password-back"
					type="button"
					label="На главную"
					onClick={() => navigate('/')}
				/>
				<Button
					onSubmit={handleSubmit}
					className="popup__recovery-password-send-again"
					type="button"
					label="Отправить повторно"
					onClick={onClose} // заменить на функцию повторной отправки
				/>
			</Popup>
		</main>
	);
}

PasswordRecoveryPopUp.propTypes = {
	isPasswordRecoveryPopUpOpen: PropTypes.bool,
	isSendPasswordRecoveryPopUpOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

PasswordRecoveryPopUp.defaultProps = {
	isPasswordRecoveryPopUpOpen: false,
};

export default PasswordRecoveryPopUp;

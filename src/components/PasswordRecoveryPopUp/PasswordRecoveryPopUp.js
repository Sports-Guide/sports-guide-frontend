import React from 'react';
import PropTypes from 'prop-types';
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

	return (
		<main>
			<Popup isOpen={isPasswordRecoveryPopUpOpen} onClose={onClose}>
				<FormTitle
					label="Восстановление пароля"
					className="popup__recovery-password-title"
				/>
				<h3 className="popup__recovery-password-subtitle">
					Пожалуйста, укажите e-mail, который был использован при регистрации
				</h3>
				<Form className="popup__recovery-password-form" onSubmit={handleSubmit}>
					<Input
						label="E-mail"
						className="popup__recovery-password-form-input"
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						name="email"
						value={email}
						minLength="6"
						maxLength="50"
					/>
					<Button
						className="popup__recovery-password-button"
						type="submit"
						label="Восстановить"
					/>
				</Form>
			</Popup>
			<Popup isOpen={isSendPasswordRecoveryPopUpOpen} onClose={onClose}>
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
				/>
				<Button
					onSubmit={handleSubmit}
					className="popup__recovery-password-send-again"
					type="button"
					label="Отправить повторно"
				/>
			</Popup>
		</main>
	);
}

PasswordRecoveryPopUp.propTypes = {
	isPasswordRecoveryPopUpOpen: PropTypes.bool.isRequired,
	isSendPasswordRecoveryPopUpOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default PasswordRecoveryPopUp;

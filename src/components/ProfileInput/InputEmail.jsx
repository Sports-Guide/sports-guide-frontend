import React, { useCallback } from 'react';
import { Field, ErrorMessage } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputEmail.scss';

export function InputEmail() {
	const validateEmail = useCallback((value) => {
		if (!value) {
			return 'Поле не может быть пустым';
		}
		if (value.length < 6) {
			return 'Почта должна содержать не менее 6 символов';
		}
		if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
			return 'Введите корректный email. Пример: user@mail.ru';
		}
		return null; // Возвращаем null, если ошибок нет
	}, []);

	return (
		<div className="email-input__container">
			<label htmlFor="Email" className="email-input__label">
				E-mail
				<Field
					id="Email"
					type="email"
					name="email"
					className="email-input"
					validate={validateEmail}
				/>
			</label>
			<ErrorMessage
				className="email-input__error"
				component="span"
				name="email"
			/>
		</div>
	);
}

export default InputEmail;

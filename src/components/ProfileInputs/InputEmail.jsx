import React, { useCallback } from 'react';
import { Field } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputEmail.scss';
import { InputContainer } from './InputContainer';

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
		<InputContainer labelText="E-mail" id="Email" name="email">
			<Field
				id="Email"
				type="email"
				name="email"
				className="email-input"
				validate={validateEmail}
			/>
		</InputContainer>
	);
}

export default InputEmail;

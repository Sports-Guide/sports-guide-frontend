import React, { useCallback } from 'react';
import { Field } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputContainer.scss';
import InputContainer from './InputContainer';

export default function InputEmail() {
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
		<InputContainer labelText="E-mail" inputId="Email">
			<Field
				id="Email"
				type="email"
				name="Email"
				className="input"
				validate={validateEmail}
				maxLength={50}
			/>
		</InputContainer>
	);
}

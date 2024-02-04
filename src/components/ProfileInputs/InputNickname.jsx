import React, { useCallback } from 'react';
import { Field } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputContainer.scss';
import InputContainer from './InputContainer';

export default function InputNickname() {
	const validateNickname = useCallback((value) => {
		if (!value) {
			return 'Поле не может быть пустым';
		}
		if (value.length < 2 || value.length > 20) {
			return 'Никнейм должен быть не менее 2 и не более 20 символов';
		}
		if (!/^[a-zA-Zа-яА-Я0-9_]{2,20}$/.test(value)) {
			return 'Никнейм может содержать латинские буквы, цифры и символ подчеркивания';
		}

		return null; // Возвращаем null, если ошибок нет
	}, []);

	return (
		<InputContainer labelText="Никнейм" inputId="Nickname">
			<Field
				id="Nickname"
				type="text"
				name="Nickname"
				className="input"
				validate={validateNickname}
				maxLength={20}
			/>
		</InputContainer>
	);
}

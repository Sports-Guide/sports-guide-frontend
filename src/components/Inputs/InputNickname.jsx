import React, { useCallback, useEffect } from 'react';
import { Field, useFormikContext } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputContainer.scss';
import InputContainer from './InputContainer';

export default function InputNickname() {
	const { values, setFieldValue } = useFormikContext();

	// не даём пользователю нажать пробел в начале и конце строки
	useEffect(() => {
		setFieldValue('Nickname', values.Nickname.trim());
	}, [values.Nickname, setFieldValue]);

	const validateNickname = useCallback((value) => {
		if (!value) {
			return 'Поле не может быть пустым';
		}
		if (value.length < 2 || value.length > 20) {
			return 'Никнейм должен быть не менее 2 и не более 20 символов';
		}
		if (!/^[a-zA-Z0-9_]{2,20}$/.test(value)) {
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

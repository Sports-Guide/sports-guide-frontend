import React, { useCallback } from 'react';
import { Field, ErrorMessage } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputNickname.scss';

export function InputNickname() {
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
		<div className="nickname-input__container">
			<label htmlFor="Nickname" className="nickname-input__label">
				Никнейм
				<Field
					id="Nickname"
					type="text"
					name="nickname"
					className="nickname-input"
					validate={validateNickname}
					maxLength={20}
				/>
			</label>
			<ErrorMessage
				className="nickname-input__error"
				component="span"
				name="nickname"
			/>
		</div>
	);
}

export default InputNickname;

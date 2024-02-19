import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './InputContainer.scss';
import './InputPassword.scss';
import { Field } from 'formik'; // https://formik.org/ - документация библиотеки formik
import InputContainer from './InputContainer';

export default function InputPassword({ labelText, inputId }) {
	const [showPassword, setShowPassword] = useState(false);

	// Функция для переключения отображения пароля
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const validatePassword = useCallback((value) => {
		if (!value) {
			return 'Поле не может быть пустым';
		}
		if (value.length < 6 || value.length > 25) {
			return 'Пароль должен содержать от 6 до 25 символов';
		}
		// спец.символы и цифры возможны, но не обязательны
		if (
			!/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d!@#$№%^&*()_+\-=\\[\]{}|;:'",.<>?\\/~]{6,25}$/.test(
				value
			)
		) {
			return 'Пароль должен содержать хотя бы одну заглавную букву и одну цифру';
		}
		return null; // Возвращаем null, если ошибок нет
	}, []);

	return (
		<InputContainer labelText={labelText} inputId={inputId}>
			<div className="password__container">
				<Field
					id={inputId}
					type={showPassword ? 'text' : 'password'}
					name={inputId}
					className="input"
					validate={validatePassword}
					maxLength={25}
				/>
				<button
					className="password__show-hide-btn"
					type="button"
					onClick={togglePasswordVisibility}
					aria-label="show-hide-password"
				/>
			</div>
		</InputContainer>
	);
}

InputPassword.propTypes = {
	labelText: PropTypes.string.isRequired,
	inputId: PropTypes.string.isRequired,
};

// Альтернативная функция проверки

// const validatePassword = useCallback((value) => {
//     if (!value) {
//         return 'Поле не может быть пустым';
//     }
//     if (value.length < 6 || value.length > 50) {
//         return 'Пароль должен содержать от 6 до 50 символов';
//     }
//     if (!/^[a-zA-Z\d]+$/.test(value)) {
//         return 'Пароль должен содержать только латинские буквы и цифры';
//     }
//     if (!/[A-Z]+/.test(value)) {
//         return 'Пароль должен содержать хотя бы одну заглавную латинскую букву';
//     }
//     if (!/[a-z]+/.test(value)) {
//         return 'Пароль должен содержать хотя бы одну строчную латинскую букву';
//     }
//     if (!/\d+/.test(value)) {
//         return 'Пароль должен содержать хотя бы одну цифру';
//     }
//     return null; // Возвращаем null, если ошибок нет
// }, []);

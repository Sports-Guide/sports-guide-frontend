import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './InputPassword.scss';
import { Field, ErrorMessage } from 'formik';
// https://formik.org/ - документация библиотеки formik

export function InputPassword({ passwordRepeat }) {
	const [showPassword, setShowPassword] = useState(false);

	// Функция для переключения отображения пароля
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const validatePassword = useCallback((value) => {
		if (!value) {
			return 'Поле не может быть пустым';
		}
		if (value.length < 6 || value.length > 50) {
			return 'Пароль должен содержать от 6 до 50 символов';
		}
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(value)) {
			return 'Пароль должен содержать хотя бы одну заглавную букву и одну цифру';
		}
		if (value.passwordRepeat && value.passwordRepeat !== value.password) {
			return 'Полея не совпадают';
		}
		return null; // Возвращаем null, если ошибок нет
	}, []);

	return (
		<div className="password-input__container">
			<label
				htmlFor={passwordRepeat ? 'RepeatPassword' : 'Password'}
				className="password-input__label"
			>
				{passwordRepeat ? 'Повторите пароль' : 'Пароль'}
				<div>
					<Field
						id={passwordRepeat ? 'RepeatPassword' : 'Password'}
						type={showPassword ? 'text' : 'password'}
						name={passwordRepeat ? 'repeatPassword' : 'password'}
						className="password-input"
						validate={validatePassword}
						maxLength={50}
					/>
					<button
						className="password-input__show-hide-btn"
						type="button"
						onClick={togglePasswordVisibility}
						aria-label="show-hide-password"
					/>
				</div>
			</label>
			<ErrorMessage
				className="password-input__error"
				component="span"
				name={passwordRepeat ? 'repeatPassword' : 'password'}
			/>
		</div>
	);
}

export default InputPassword;

InputPassword.propTypes = {
	passwordRepeat: PropTypes.bool,
};

InputPassword.defaultProps = {
	passwordRepeat: false,
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

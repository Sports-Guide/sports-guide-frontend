import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form'; // useWatch
import './PasswordData.scss';

export function PasswordData({ onEditPassword, isEditing }) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({ mode: 'onChange' });

	// const newPassword = useWatch({ name: 'password', control: 'control' });

	// const validatePasswordMatch = () => {
	//     const confirmPassword = watch('confirmPassword'); // 'confirmPassword' is the name of the confirm password input
	//     if (confirmPassword === password) {
	//         return true;
	//       } else {
	//         setError('confirmPassword', {
	//           type: 'manual',
	//           message: 'Passwords do not match',
	//         });
	//         return false;
	//       }
	//     };

	const onSubmit = (data) => {
		onEditPassword(data);
	};

	// variables for htmlFor
	const currentPassword = 'Старый пароль';
	const newPassword = 'Новый пароль';
	const confirmPassword = 'Подтвердите пароль';

	return (
		<form
			className="form__password-container"
			onSubmit={handleSubmit(onSubmit)}
		>
			{' '}
			{isEditing && (
				<>
					<label className="password-label" htmlFor="currentPassword">
						{currentPassword}
					</label>
					<div className="password-input-container">
						<input
							className="password-input"
							type={showPassword ? 'text' : 'password'}
							maxLength="25"
							autoComplete="off"
							{...register('currentPassword', {
								required: {
									value: true,
									message: 'Поле не может быть пустым',
								},
								minLength: {
									value: 6,
									message: 'Пароль должен быть не менее 6 символов',
								},
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
									message:
										'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
								},
							})}
						/>
						{errors?.currentPassword && (
							<span className="password-error">
								{errors?.currentPassword?.message}
							</span>
						)}
						<button
							className="password-show-hide-button"
							type="button"
							onClick={() => togglePasswordVisibility('currentPassword')}
							aria-label="show-hide-password"
						/>
					</div>
					<label className="password-label" htmlFor="newPassword">
						{newPassword}
					</label>
					<div className="password-input-container">
						<input
							className="password-input"
							type={showPassword ? 'text' : 'password'}
							label="Новый пароль"
							htmlFor="newPassword"
							maxLength="25"
							autoComplete="off"
							{...register('newPassword', {
								required: {
									value: true,
									message: 'Поле не может быть пустым',
								},
								minLength: {
									value: 6,
									message: 'Пароль должен быть не менее 6 символов',
								},
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
									message:
										'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
								},
							})}
						/>
						{errors?.newPassword && (
							<span className="password-error password-error_active">
								{errors?.newPassword?.message}
							</span>
						)}
						<button
							className="password-show-hide-button"
							type="button"
							onClick={() => togglePasswordVisibility('currentPassword')}
							aria-label="show-hide-password"
						/>
					</div>
					<label className="password-label" htmlFor="confirmPassword">
						{confirmPassword}
					</label>
					<div className="password-input-container">
						<input
							className="password-input"
							type={showPassword ? 'text' : 'password'}
							label="Повторите новый пароль"
							htmlFor="confirmPassword"
							maxLength="25"
							autoComplete="off"
							{...register('confirmPassword', {
								required: {
									value: true,
									message: 'Поле не может быть пустым',
								},
								minLength: {
									value: 6,
									message: 'Пароль должен быть не менее 6 символов',
								},
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
									message:
										'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
								},
							})}
						/>
						{errors?.confirmPassword && (
							<span className="password-error password-error_active">
								{errors?.confirmPassword?.message}
							</span>
						)}
						<button
							className="password-show-hide-button"
							type="button"
							onClick={() => togglePasswordVisibility('currentPassword')}
							aria-label="show-hide-password"
						/>
					</div>
				</>
			)}
			<button
				className="form__change-password-button"
				type={isEditing ? 'submit' : 'button'}
				onClick={onEditPassword}
				disabled={isEditing && !isValid}
			>
				{isEditing ? 'Сохранить' : 'Изменить пароль'}
			</button>
		</form>
	);
}

PasswordData.propTypes = {
	onEditPassword: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
};

export default PasswordData;

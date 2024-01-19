import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import './PasswordData.scss';
import { PasswordInputWithValidation } from '../PasswordInputWithValidation/PasswordInputWithValidation';

export function PasswordData({ onEditPassword, isPasswordEditing }) {
	const {
		formState: { isValid },
		handleSubmit,
		control,
		getValues,
	} = useForm({ mode: 'onChange' });

	const onSubmit = (data) => {
		onEditPassword(data);
	};

	const emailRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

	return (
		<form
			className="form__password-container"
			onSubmit={handleSubmit(onSubmit)}
		>
			{isPasswordEditing && (
				<>
					<PasswordInputWithValidation
						labelClassName="profile-password-label"
						passwordBtnClassName="password-show-hide-btn-profile"
						label="Старый пароль"
						htmlFor="currentPassword"
						inputClassName="profile-password-input"
						inputContainerClassName="profile-password-input-container"
						errorClassName="profile-password-error"
						name="currentPassword"
						id="currentPassword"
						control={control}
						rules={{
							required: 'Поле не может быть пустым',
							minLength: {
								value: 6,
								message: 'Пароль должен быть не менее 6 символов',
							},
							pattern: {
								value: emailRegEx,
								message:
									'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
							},
							// validate: (value) =>
							// value === currentUser.currentPassword || 'Неверный текущий пароль',
						}}
					/>
					<PasswordInputWithValidation
						labelClassName="profile-password-label"
						passwordBtnClassName="password-show-hide-btn-profile"
						label="Новый пароль"
						htmlFor="newPassword"
						inputClassName="profile-password-input"
						inputContainerClassName="profile-password-input-container"
						errorClassName="profile-password-error"
						name="newPassword"
						id="newPassword"
						control={control}
						rules={{
							required: 'Поле не может быть пустым',
							minLength: {
								value: 6,
								message: 'Пароль должен быть не менее 6 символов',
							},
							pattern: {
								value: emailRegEx,
								message:
									'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
							},
						}}
					/>
					<PasswordInputWithValidation
						labelClassName="profile-password-label"
						passwordBtnClassName="password-show-hide-btn-profile"
						label="Подтвердите пароль"
						htmlFor="confirmPassword"
						inputClassName="profile-password-input"
						inputContainerClassName="profile-password-input-container"
						errorClassName="profile-password-error"
						name="confirmPassword"
						id="confirmPassword"
						control={control}
						rules={{
							required: 'Поле не может быть пустым',
							minLength: {
								value: 6,
								message: 'Пароль должен быть не менее 6 символов',
							},
							pattern: {
								value: emailRegEx,
								message:
									'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
							},
							validate: (value) =>
								value === getValues('newPassword') || 'Пароли не совпадают',
						}}
					/>
				</>
			)}
			<button
				className={`form__change-password-button ${
					isPasswordEditing ? 'has-margin' : 'no-margin'
				}`}
				type={isPasswordEditing ? 'submit' : 'button'}
				onClick={onEditPassword}
				disabled={isPasswordEditing && !isValid}
			>
				{isPasswordEditing ? 'Сохранить' : 'Изменить пароль'}
			</button>
		</form>
	);
}

PasswordData.propTypes = {
	onEditPassword: PropTypes.func.isRequired,
	isPasswordEditing: PropTypes.bool.isRequired,
};

export default PasswordData;

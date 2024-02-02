import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
	fetchUserInfo,
	fetchNewPassword,
} from '../../services/thunks/userThunk';
import {
	getUserInfo,
	getIsPasswordEditing,
} from '../../services/selectors/userSelector';
import {
	setIsPasswordEditingTrue,
	setIsPasswordEditingFalse,
} from '../../services/slices/userSlice';
import './PasswordData.scss';
import { PasswordInputWithValidation } from '../PasswordInputWithValidation/PasswordInputWithValidation';
import FormTitle from '../FormTitle/FormTitle';

export function PasswordData() {
	const dispatch = useDispatch();
	const user = useSelector(getUserInfo);
	const IsPasswordEditing = useSelector(getIsPasswordEditing);

	const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/;

	useEffect(() => {
		dispatch(fetchUserInfo());
	}, [dispatch]);

	const {
		formState: { isValid },
		handleSubmit,
		control,
		getValues,
	} = useForm({ mode: 'onChange' });

	const resetUserDataEditing = useCallback(() => {
		dispatch(setIsPasswordEditingFalse()); // отключаем режим редактирования при размонтировании компонента (при свиче)
	}, [dispatch]);

	useEffect(() => {
		// при каждом рендере вызываем ресет состояния редактирования
		const cleanup = () => {
			resetUserDataEditing();
		};

		return cleanup;
	}, [resetUserDataEditing]);

	const onSubmit = () => {
		const currentPassword = getValues('currentPassword');
		const newPassword = getValues('newPassword');
		if (
			user.currentPassword === currentPassword &&
			passwordRegEx.test(newPassword)
		) {
			dispatch(
				fetchNewPassword({
					currentPassword,
					newPassword,
				})
			)
				.then(() => {
					dispatch(setIsPasswordEditingFalse());
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<>
			<FormTitle label="Пароль" className="form__title_place_profile" />
			<form
				className="form__password-container"
				onSubmit={handleSubmit(onSubmit)}
			>
				{IsPasswordEditing && (
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
									value: passwordRegEx,
									message:
										'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
								},
								validate: (value) =>
									value === getValues('currentPassword') || 'Неверный пароль',
							}}
							maxLength={25}
							required
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
									value: passwordRegEx,
									message:
										'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
								},
								validate: (value) =>
									value !== getValues('currentPassword') || 'Пароли совпадают',
							}}
							maxLength={25}
						/>
					</>
				)}
				<button
					className={`form__change-password-button ${
						IsPasswordEditing ? 'has-margin' : 'no-margin'
					}`}
					type={IsPasswordEditing ? 'submit' : 'button'}
					onClick={() => {
						dispatch(setIsPasswordEditingTrue());
					}}
					disabled={IsPasswordEditing && !isValid}
				>
					{IsPasswordEditing ? 'Сохранить' : 'Изменить пароль'}
				</button>
			</form>
		</>
	);
}

export default PasswordData;

import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../services/slices/modalSlice';

// import { useForm } from 'react-hook-form';

// import { fetchNewPassword } from '../../services/thunks/userThunk';
// import { getIsPasswordEditing } from '../../services/selectors/userSelector';
// import {
// 	setIsPasswordEditingTrue,
// 	setIsPasswordEditingFalse,
// } from '../../services/slices/userSlice';
import './PasswordData.scss';
// import { PasswordInputWithValidation } from '../PasswordInputWithValidation/PasswordInputWithValidation';

export function PasswordData() {
	const dispatch = useDispatch();
	// const IsPasswordEditing = useSelector(getIsPasswordEditing);

	// const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,25}$/;

	// const {
	// 	formState: { isValid },
	// 	handleSubmit,
	// 	control,
	// 	getValues,
	// 	reset,
	// } = useForm({ mode: 'onChange' });

	// const resetPasswordDataEditing = useCallback(() => {
	// 	dispatch(setIsPasswordEditingFalse()); // отключаем режим редактирования при размонтировании компонента (при свиче)
	// }, [dispatch]);

	// useEffect(() => {
	// 	// при каждом рендере вызываем ресет состояния редактирования
	// 	const cleanup = () => {
	// 		resetPasswordDataEditing();
	// 	};

	// 	return cleanup;
	// }, [resetPasswordDataEditing]);

	const handleOpenModal = (type) => {
		dispatch(openModal(type));
	};

	// const handleSubmit = () => {
	// 	const currentPassword = getValues('currentPassword');
	// 	const newPassword = getValues('newPassword');
	// 	if (currentPassword && newPassword) {
	// 		dispatch(
	// 			fetchNewPassword({
	// 				current_password: currentPassword,
	// 				new_password: newPassword,
	// 			})
	// 		)
	// 			.then(() => {
	// 				dispatch(setIsPasswordEditingFalse());
	// 				reset();
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	} else {
	// 		console.log('Что-то пошло не так при изменении пароля');
	// 		dispatch(setIsPasswordEditingFalse());
	// 	}
	// };
	// const onSubmit = () => {
	// 	const currentPassword = getValues('currentPassword');
	// 	const newPassword = getValues('newPassword');
	// 	if (currentPassword && newPassword) {
	// 		dispatch(
	// 			fetchNewPassword({
	// 				current_password: currentPassword,
	// 				new_password: newPassword,
	// 			})
	// 		)
	// 			.then(() => {
	// 				dispatch(setIsPasswordEditingFalse());
	// 				reset();
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	} else {
	// 		console.log('Что-то пошло не так при изменении пароля');
	// 		dispatch(setIsPasswordEditingFalse());
	// 	}
	// };

	return (
		<>
			<h2 className="form__title_place_profile">Пароль</h2>
			<button
				className="form__change-password-button no-margin"
				type="button"
				onClick={() => handleOpenModal('passwordReset')}
				disabled={false}
			>
				Сбросить
			</button>
		</>
	);
}

export default PasswordData;

// 	return (
// 		<>
// 			<FormTitle label="Пароль" className="form__title_place_profile" />
// 			<form
// 				className="form__password-container"
// 				onSubmit={handleSubmit(onSubmit)}
// 			>
// 				{IsPasswordEditing ? (
// 					<>
// 						<PasswordInputWithValidation
// 							labelClassName="profile-password-label"
// 							passwordBtnClassName="password-show-hide-btn-profile"
// 							label="Старый пароль"
// 							htmlFor="currentPassword"
// 							inputClassName="profile-password-input"
// 							inputContainerClassName="profile-password-input-container"
// 							errorClassName="profile-password-error"
// 							name="currentPassword"
// 							id="currentPassword"
// 							control={control}
// 							rules={{
// 								required: 'Поле не может быть пустым',
// 								minLength: {
// 									value: 6,
// 									message: 'Пароль должен быть не менее 6 символов',
// 								},
// 								pattern: {
// 									value: passwordRegEx,
// 									message:
// 										// 'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
// 										'Пароль должен: латинские буквы (верхний и нижний регистр), цифры, другие символы.',
// 								},
// 							}}
// 							maxLength={25}
// 							required
// 						/>
// 						<PasswordInputWithValidation
// 							labelClassName="profile-password-label"
// 							passwordBtnClassName="password-show-hide-btn-profile"
// 							label="Новый пароль"
// 							htmlFor="newPassword"
// 							inputClassName="profile-password-input"
// 							inputContainerClassName="profile-password-input-container"
// 							errorClassName="profile-password-error"
// 							name="newPassword"
// 							id="newPassword"
// 							control={control}
// 							rules={{
// 								required: 'Поле не может быть пустым',
// 								minLength: {
// 									value: 6,
// 									message: 'Пароль должен быть не менее 6 символов',
// 								},
// 								pattern: {
// 									value: passwordRegEx,
// 									message:
// 										'Пароль должен содержать латинские буквы в верхнем и нижнем регистре, может содержать цифры и другие символы',
// 								},
// 								validate: (value) =>
// 									value !== getValues('currentPassword') || 'Пароли совпадают',
// 							}}
// 							maxLength={25}
// 						/>
// 						<div className="profile__pass-button-container">
// 							<button
// 								className="form__change-password-button"
// 								type="submit"
// 								onClick={() => {
// 									dispatch(setIsPasswordEditingTrue());
// 								}}
// 								disabled={!isValid}
// 							>
// 								Сохранить
// 							</button>
// 							<button
// 								className="profile__cancel-button"
// 								type="button"
// 								onClick={() => dispatch(setIsPasswordEditingFalse())}
// 							>
// 								Отмена
// 							</button>
// 						</div>
// 					</>
// 				) : (
// 					<button
// 						className="form__change-password-button no-margin"
// 						type="button"
// 						onClick={() => {
// 							dispatch(setIsPasswordEditingTrue());
// 						}}
// 						disabled={!isValid}
// 					>
// 						Изменить
// 					</button>
// 				)}
// 			</form>
// 		</>
// 	);
// }

// export default PasswordData;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchUserInfo,
	fetchEditUserInfo,
} from '../../services/thunks/userThunk';
import {
	getUserInfo,
	getIsUserDataEditing,
} from '../../services/selectors/userSelector';
import {
	setIsUserDataEditingTrue,
	setIsUserDataEditingFalse,
} from '../../services/slices/userSlice';
import './PersonalData.scss';

export function PersonalData() {
	const dispatch = useDispatch();
	const user = useSelector(getUserInfo);
	const isUserDataEditing = useSelector(getIsUserDataEditing);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onChange' });

	useEffect(() => {
		dispatch(fetchUserInfo());
	}, [dispatch]);

	useEffect(() => {
		reset(user);
	}, [user, reset]);

	const onSubmit = ({ nickname, email }) => {
		if (user.nickname !== nickname || user.email !== email) {
			// диспачим только если есть изменения
			dispatch(fetchEditUserInfo({ nickname, email }))
				.then(() => {
					dispatch(setIsUserDataEditingFalse());
				})
				.catch((error) => {
					console.error('Ошибка обновления профиля:', error);
				});
		} else {
			console.log('No changes made');
			dispatch(setIsUserDataEditingFalse());
		}
	};

	return (
		<div className="form_place_profile">
			<div className="profile__personal-info-container">
				<button
					type="button"
					className="profile__avatar-button"
					// onClick={onEditAvatar}
				>
					{/* <img 
                    // src={currentUser.avatar}
                    alt="Аватар профиля"
                    className="profile__avatar" /> */}
				</button>
				<div className="profile__name-container">
					<p className="profile__name">{user?.nickname}</p>
					<p className="profile__email">{user?.email}</p>
				</div>
			</div>
			{isUserDataEditing ? (
				<form
					className="profile__change-info-container"
					onSubmit={handleSubmit(onSubmit)}
				>
					<input
						className={`profile__input ${
							errors?.nickname && 'profile__input_error'
						}`}
						{...register('nickname', {
							pattern: {
								value: /^[a-zA-Zа-яА-Я0-9_]{2,20}$/,
								message:
									'Никнейм может содержать латинские буквы, цифры и другие символы',
							},
							minLength: {
								value: 2,
								message:
									'Никнейм должен быть не менее 2 символов, включать латинские буквы, может содержать цифры и другие символы',
							},
							required: 'Поле не может быть пустым',
						})}
						type="text"
						defaultValue={user?.nickname}
						placeholder="Никнейм"
						maxLength={20}
					/>
					{errors?.login && (
						<span className="error error_active">{errors?.login?.message}</span>
					)}
					<input
						className={`profile__input ${
							errors?.email && 'profile__input_error'
						}`}
						{...register('email', {
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
								message: 'Введите корректный email. Пример: user@mail.ru',
							},
							minLength: {
								value: 6,
								message: 'Почта должна содержать не менее 6 символов',
							},
							required: 'Поле не может быть пустым',
						})}
						type="email"
						defaultValue={user?.email}
						placeholder="E-mail"
						maxLength={50}
					/>
					{errors?.email && (
						<span className="error error_active">{errors?.email?.message}</span>
					)}
					<button
						className="profile__change-button"
						type="submit"
						onClick={() => dispatch(setIsUserDataEditingTrue(false))}
						disabled={!isValid}
					>
						{isUserDataEditing ? 'Сохранить изменения' : 'Изменить данные'}
					</button>
				</form>
			) : (
				<>
					<div className="profile__info-container">
						<p className="profile__field-title">Никнейм</p>
						<p className="profile__field-name">{user?.nickname}</p>
						<p className="profile__field-title">Почта</p>
						<p className="profile__field-name">{user?.email}</p>
					</div>
					<button
						className="profile__change-button"
						type="button"
						onClick={() => dispatch(setIsUserDataEditingTrue())}
						disabled={!isValid}
					>
						{isUserDataEditing ? 'Сохранить изменения' : 'Изменить данные'}
					</button>
				</>
			)}
		</div>
	);
}

export default PersonalData;

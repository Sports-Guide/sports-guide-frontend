import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import './PersonalData.scss';
// import CurrentUserContext from '../../contexts/CurrentUserContext';

export function PersonalData({
	isPersonalDataEditing,
	// onEditAvatar, // сделаю позже
	onEditProfile,
}) {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({ mode: 'onChange' });

	const onSubmit = (data) => {
		onEditProfile(data);
	};

	// const currentUser = React.useContext(CurrentUserContext);

	return (
		<form className="form_place_profile">
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
					{/* <p className="profile__name">{currentUser.name}</p> */}
					<p className="profile__name">User1234</p>
					<p className="profile__email">mail@example.ru</p>
				</div>
			</div>
			{isPersonalDataEditing ? (
				<div
					className="profile__change-info-container"
					onSubmit={handleSubmit(onSubmit)}
				>
					<input
						className={`profile__input ${
							errors?.login && 'profile__input_error'
						}`}
						{...register('login', {
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
						// value="User1234"
						// value={currentUser.login}
						placeholder="Никнейм"
						maxLength={20}
					/>
					{errors?.login && (
						<span className="error error_place_profile">
							{errors?.login?.message}
						</span>
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
						// value="mail@example.ru"
						// value={currentUser.email}
						placeholder="E-mail"
						maxLength={50}
					/>
					{errors?.email && (
						<span className="error error_place_profile">
							{errors?.email?.message}
						</span>
					)}
				</div>
			) : (
				<div className="profile__info-container">
					<p className="profile__field-title">Никнейм</p>
					<p className="profile__field-name">user-xd6xm1lh5y</p>
					<p className="profile__field-title">Почта</p>
					<p className="profile__field-name">mail@example.ru</p>
				</div>
			)}
			<button
				className="profile__change-button"
				type={isPersonalDataEditing ? 'submit' : 'button'}
				onClick={onEditProfile}
				disabled={!isValid}
			>
				{isPersonalDataEditing ? 'Сохранить изменения' : 'Изменить данные'}
			</button>
		</form>
	);
}

PersonalData.propTypes = {
	isPersonalDataEditing: PropTypes.bool.isRequired,
	// onEditAvatar: PropTypes.func.isRequired,
	onEditProfile: PropTypes.func.isRequired,
};

export default PersonalData;

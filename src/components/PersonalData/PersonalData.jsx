import React from 'react';
// import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import './PersonalData.scss';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export function PersonalData({ isEditing, onEditAvatar, onEditProfile }) {
	return (
		<>
			<div className="profile__personal-info-container">
				<button
					type="button"
					className="profile__avatar-button"
					onClick={onEditAvatar}
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
			{isEditing ? (
				<div className="profile__change-info-container">
					<Input
						className="profile__input profile__input_login"
						type="text"
						name="login"
						value="User1234"
						// value={currentUser.login}
						placeholder="Никнейм"
						minLength="6"
						maxLength="20"
					/>
					<span className="error error_place_profile">
						Никнейм должен быть не менее 2 символов, включать латинские буквы,
						может содержать цифры и другие символы
					</span>
					<Input
						className="profile__input profile__input_email"
						type="email"
						name="email"
						value="mail@example.ru"
						// value={currentUser.email}
						placeholder="E-mail"
						minLength="6"
						maxLength="50"
					/>
					<span className="error error_place_profile">
						Введите корректный email. Пример: user@mail.ru
					</span>
				</div>
			) : (
				<div className="profile__info-container">
					<p className="profile__field-title">Никнейм</p>
					<p className="profile__field-name">User1234</p>
					<p className="profile__field-title">Почта</p>
					<p className="profile__field-name">mail@example.ru</p>
				</div>
			)}

			<Button
				className="profile__change-button"
				onClick={onEditProfile}
				label={isEditing ? 'Сохранить изменения' : 'Изменить данные'}
			/>
		</>
	);
}

PersonalData.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	onEditAvatar: PropTypes.func.isRequired,
	onEditProfile: PropTypes.func.isRequired,
};

export default PersonalData;

import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import { Form } from '../Form/Form';
import FormTitle from '../FormTitle/FormTitle';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Popup } from '../Popup/Popup';

export function Profile({
	isEditing,
	onEditProfile,
	onDelete,
	onLogOut,
	onDeleteAccountPopupOpen,
	onLogoutPopupOpen,
	isLogoutPopupOpen,
	isDeleteAccountPopupOpen,
	onClose,
}) {
	return (
		<main className="profile">
			<section className="profile__container">
				<div className="profile__info-block">
					<Form>
						<FormTitle
							label="Личные данные"
							className="form__title_place_profile"
						/>
						<Button
							className="form__button_place_profile"
							onClick={onEditProfile}
						/>
						<p className="profile__input-title">Логин</p>
						{isEditing ? (
							<Input
								className="input_place_profile"
								type="text"
								name="login"
								placeholder="Введите имя"
								minLength="6"
								maxLength="20"
							/>
						) : (
							<p className="profile__caption profile__caption_name">login</p>
						)}
						<span className="error error_place_profile">Error</span>
						<p className="profile__input-title">Почта</p>
						{isEditing ? (
							<Input
								className="input_place_profile"
								type="email"
								name="email"
								placeholder="Введите почту"
								minLength="6"
								maxLength="50"
							/>
						) : (
							<p className="profile__caption profile__caption_name">login</p>
						)}
						<span className="error error_place_profile">Error</span>
					</Form>
					<FormTitle
						label="Изменить пароль"
						className="form__title_place_profile"
					/>
					<button
						className="form__button form__button_place_profile form__button_password-edit"
						aria-label="edit"
					/>
					<p className="profile__input-title">Старый пароль</p>
					{isEditing ? (
						<Input
							className="input_place_profile"
							type="text"
							name="login"
							placeholder="Введите пароль"
							minLength="2"
							maxLength="25"
						/>
					) : (
						<p className="profile__caption profile__caption_name">|</p>
					)}
					<span className="error error_place_profile">Error</span>
					<p className="profile__input-title">Новый пароль</p>
					{isEditing ? (
						<Input
							className="input_place_profile"
							type="text"
							name="login"
							placeholder="Введите пароль"
							minLength="2"
							maxLength="25"
						/>
					) : (
						<p className="profile__caption profile__caption_name">********</p>
					)}
					<span className="error error_place_profile">Error</span>
					<div className="button__container">
						{isEditing ? (
							<Button
								className="button-y"
								onClick={onDeleteAccountPopupOpen}
								label="Удалить аккаунт"
							/>
						) : null}
						<Button
							className="button-y"
							onClick={onLogoutPopupOpen}
							label="Выйти"
						/>
					</div>
				</div>
			</section>
			<Popup isOpen={isLogoutPopupOpen} onClose={onClose} title="Выход">
				<h3 className="popup__title">Вы хотите выйти из профиля?</h3>
				<div className="popup__button-container">
					<Button
						className="popup__button popup__button-y"
						onClick={onLogOut}
						label="Да"
					/>
					<Button
						className="popup__button popup__button-n"
						onClick={onClose}
						label="Нет"
					/>
				</div>
			</Popup>
			<Popup
				isOpen={isDeleteAccountPopupOpen}
				onClose={onClose}
				title="Удаление аккаунта"
			>
				<h3 className="popup__title">
					Вы действительно хотите удалить аккаунт?
				</h3>
				<div className="popup__button-container">
					<Button
						className="popup__button popup__button-y"
						onClick={onDelete}
						label="Да"
					/>
					<Button
						className="popup__button popup__button-n"
						onClick={onClose}
						label="Нет"
					/>
				</div>
			</Popup>
		</main>
	);
}

Profile.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	onEditProfile: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired,
	onDeleteAccountPopupOpen: PropTypes.func.isRequired,
	onLogoutPopupOpen: PropTypes.func.isRequired,
	isLogoutPopupOpen: PropTypes.bool.isRequired,
	isDeleteAccountPopupOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Profile;

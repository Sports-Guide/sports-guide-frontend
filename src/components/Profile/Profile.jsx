import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import { Form } from '../Form/Form';
import FormTitle from '../FormTitle/FormTitle';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Popup } from '../Popup/Popup';
import { PasswordInput } from '../PasswordInput/PasswordInput';

export function Profile({
	isEditing,
	onEditProfile,
	onEditPassword,
	onDelete,
	onLogOut,
	onDeleteAccountPopupOpen,
	onLogoutPopupOpen,
	isLogoutPopupOpen,
	isDeleteAccountPopupOpen,
	isPasswordEditPopupOpen,
	onChangePasswordSubmit,
	onClose,
}) {
	// добавить логику на сравнение полей Никнейм и Почта: если совпадают, поля неактивны

	const onSubmitNameAndEmail = (e) => {
		e.preventDefault();
		// handleUpdateUser(name, email);
		// убрать evt, т.к. react-hook-form уже предусматрвает это
	};

	const onSubmitPassword = (e) => {
		e.preventDefault();
		// onChangePasswordSubmit();
		// убрать evt, т.к. react-hook-form уже предусматрвает это
	};

	return (
		<main className="profile">
			<section className="profile__container">
				<div className="profile__info-block">
					<Form className="form_place_profile">
						<FormTitle
							label="Личные данные"
							className="form__title_place_profile"
						/>
						<div className="form__personal-data-header-container">
							<h2 className="form__personal-data-title">Имя и почта</h2>
							<Button
								className="form__button_place_profile"
								onClick={onEditProfile}
								label={isEditing ? 'Отменить редактирование' : 'Редактировать'}
							/>
						</div>
						<p className="profile__input-title">Никнейм</p>
						{/* <p className="profile__input-title">Логин</p> */}
						<Input
							className="profile__input profile__input_name"
							type="text"
							name="login"
							value="login"
							placeholder="Введите имя"
							minLength="6"
							maxLength="20"
						/>
						{/* {isEditing ? (
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
						)} */}
						{/* <span className="error error_place_profile">Error</span> */}
						<span className="error error_place_profile">
							Никнейм должен быть не менее 2 символов, включать латинские буквы,
							может содержать цифры и другие символы
						</span>
						<p className="profile__input-title">Почта</p>
						<Input
							className="profile__input profile__input_email"
							type="email"
							name="email"
							value="adress@pochta.com"
							placeholder="Введите почту"
							minLength="6"
							maxLength="50"
						/>
						{/* {isEditing ? (
							<Input
								className="input_place_profile"
								type="email"
								name="email"
								placeholder="Введите почту"
								minLength="6"
								maxLength="50"
							/>
						) : (
							<p className="profile__caption profile__caption_name">adress@pochta.com</p>
						)} */}
						{/* <span className="error error_place_profile">Error</span> */}
						<span className="error error_place_profile">
							Введите корректный email. Пример: user@mail.ru
						</span>
						{isEditing && (
							<Button
								className="form__button form__button_submit_changes"
								onClick={onSubmitNameAndEmail}
								type="submit"
								label="Сохранить изменения"
								// disabled={}
							/>
						)}
					</Form>
					<FormTitle
						// label="Изменить пароль"
						label="Пароль"
						className="form__title_place_profile"
					/>
					<button
						// className="form__button form__button_place_profile form__button_password-edit"
						className="form__button form__button_password-edit"
						// aria-label="edit"
						aria-label="Изменить пароль"
						onClick={onEditPassword}
					>
						Изменить пароль
					</button>
					{/* <p className="profile__input-title">Старый пароль</p>
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
							maxLength="25" */}
					{/* />
					) : (
						<p className="profile__caption profile__caption_name">********</p>
					)}
					<span className="error error_place_profile">Error</span> */}
					<div className="button__container">
						<Button
							className="profile__button-logout"
							onClick={onLogoutPopupOpen}
							label="Выйти из аккаунта"
						/>
						<Button
							className="profile__button-account-delete"
							onClick={onDeleteAccountPopupOpen}
							label="Удалить аккаунт"
						/>
					</div>
					{/* <div className="button__container">
						{isEditing ? (
							<Button
								className="button-y"
								onClick={onDeleteAccountPopupOpen}
								label="Удалить аккаунт"
							/>
						) : null}
						<Button className="button-y" onClick={onLogoutPopupOpen} label="Выйти" />
					</div> */}
				</div>
			</section>
			<Popup
				isOpen={isPasswordEditPopupOpen}
				onClose={onClose}
				title="Изменение пароля"
			>
				<Form
					className="popup__change-password-form"
					onSubmit={onChangePasswordSubmit}
				>
					<PasswordInput
						label="Старый пароль"
						htmlFor="currentPasswordInput"
						idName="currentPasswordInput"
						name="current-password"
						minLength="2"
						maxLength="25"
						errorMessage="Неверный пароль"
					/>
					<PasswordInput
						label="Новый пароль"
						htmlFor="newPasswordInput"
						idName="newPasswordInput"
						name="new-password"
						minLength="2"
						maxLength="25"
						errorMessage="Пароль должен быть не менее 6 символов, включать латинские буквы 
					в верхнем и нижнем регистре, может содержать цифры и другие символы"
					/>
					<PasswordInput
						label="Повторите пароль"
						htmlFor="repeatPasswordInput"
						idName="repeatPasswordInput"
						name="repeat-password"
						minLength="2"
						maxLength="25"
						errorMessage="Пароли не совпадают"
					/>
					<Button
						className="popup__button popup__change-password-button"
						onClick={onSubmitPassword}
						label="Сохранить "
					/>
				</Form>
			</Popup>
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
	onEditPassword: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired,
	onLogoutPopupOpen: PropTypes.func.isRequired,
	isLogoutPopupOpen: PropTypes.bool.isRequired,
	onDeleteAccountPopupOpen: PropTypes.func.isRequired,
	isDeleteAccountPopupOpen: PropTypes.bool.isRequired,
	isPasswordEditPopupOpen: PropTypes.bool.isRequired,
	onChangePasswordSubmit: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Profile;

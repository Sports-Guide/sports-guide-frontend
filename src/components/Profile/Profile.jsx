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
	// onEditPassword, // не удалять, надо будет добавить
	onDelete,
	onLogOut,
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
				<nav className="profile__navigation">
					<div className="profile__menu">
						<button
							className="profile__menu-button profile__menu-button_active"
							aria-label="Личные данные"
						>
							<svg
								className="profile__menu-button-icon"
								alt="a person in circle icon for a personal info field"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 13C11.7348 13 11.4804 13.1054 11.2929 13.2929C11.1054 13.4804 11 13.7348 11 14V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V14C13 13.7348 12.8946 13.4804 12.7071 13.2929C12.5196 13.1054 12.2652 13 12 13ZM17 9V7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7V9C6.20435 9 5.44129 9.31607 4.87868 9.87868C4.31607 10.4413 4 11.2044 4 12V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V12C20 11.2044 19.6839 10.4413 19.1213 9.87868C18.5587 9.31607 17.7956 9 17 9ZM9 7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4C12.7956 4 13.5587 4.31607 14.1213 4.87868C14.6839 5.44129 15 6.20435 15 7V9H9V7ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V12C6 11.7348 6.10536 11.4804 6.29289 11.2929C6.48043 11.1054 6.73478 11 7 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12V19Z"
									fill="#1478FF"
								/>
							</svg>
							Личные данные
						</button>
						<button
							className="profile__menu-button profile__menu-button_active"
							aria-label="Пароль"
						>
							<svg
								className="profile__menu-button-icon"
								alt="lock icon for a password field"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12.0005 2C10.061 2.00369 8.16442 2.57131 6.54177 3.63374C4.91911 4.69617 3.64043 6.20754 2.86148 7.98377C2.08252 9.76 1.83691 11.7244 2.15456 13.6378C2.47221 15.5511 3.33941 17.3308 4.65054 18.76C5.58696 19.775 6.72348 20.5851 7.98847 21.1392C9.25347 21.6933 10.6195 21.9793 12.0005 21.9793C13.3816 21.9793 14.7476 21.6933 16.0126 21.1392C17.2776 20.5851 18.4141 19.775 19.3505 18.76C20.6617 17.3308 21.5289 15.5511 21.8465 13.6378C22.1642 11.7244 21.9186 9.76 21.1396 7.98377C20.3606 6.20754 19.082 4.69617 17.4593 3.63374C15.8367 2.57131 13.9401 2.00369 12.0005 2ZM12.0005 20C9.929 19.9969 7.93945 19.1903 6.45054 17.75C6.90258 16.6495 7.67157 15.7083 8.65979 15.0459C9.64801 14.3835 10.8108 14.0298 12.0005 14.0298C13.1902 14.0298 14.3531 14.3835 15.3413 15.0459C16.3295 15.7083 17.0985 16.6495 17.5505 17.75C16.0616 19.1903 14.0721 19.9969 12.0005 20ZM10.0005 10C10.0005 9.60444 10.1178 9.21776 10.3376 8.88886C10.5574 8.55996 10.8697 8.30362 11.2352 8.15224C11.6006 8.00087 12.0028 7.96126 12.3907 8.03843C12.7787 8.1156 13.135 8.30608 13.4148 8.58579C13.6945 8.86549 13.8849 9.22186 13.9621 9.60982C14.0393 9.99778 13.9997 10.3999 13.8483 10.7654C13.6969 11.1308 13.4406 11.4432 13.1117 11.6629C12.7828 11.8827 12.3961 12 12.0005 12C11.4701 12 10.9614 11.7893 10.5863 11.4142C10.2113 11.0391 10.0005 10.5304 10.0005 10ZM18.9105 16C18.0171 14.4718 16.6419 13.283 15.0005 12.62C15.5097 12.0427 15.8415 11.3307 15.956 10.5694C16.0705 9.80822 15.963 9.03011 15.6463 8.3285C15.3296 7.62688 14.8171 7.03156 14.1704 6.61397C13.5238 6.19637 12.7703 5.97425 12.0005 5.97425C11.2307 5.97425 10.4773 6.19637 9.83063 6.61397C9.18395 7.03156 8.67151 7.62688 8.35479 8.3285C8.03807 9.03011 7.93052 9.80822 8.04507 10.5694C8.15961 11.3307 8.49137 12.0427 9.00054 12.62C7.35914 13.283 5.98401 14.4718 5.09054 16C4.37848 14.7871 4.00226 13.4065 4.00054 12C4.00054 9.87827 4.84339 7.84344 6.34368 6.34315C7.84397 4.84285 9.87881 4 12.0005 4C14.1223 4 16.1571 4.84285 17.6574 6.34315C19.1577 7.84344 20.0005 9.87827 20.0005 12C19.9988 13.4065 19.6226 14.7871 18.9105 16Z"
									fill="#1478FF"
								/>
							</svg>
							Пароль
						</button>
					</div>
					<div className="profile__menu">
						<Button
							className="profile__button-logout"
							onClick={onLogOut}
							label="Выйти"
						/>
						<Button
							className="profile__button-account-delete"
							onClick={onDelete}
							label="Удалить аккаунт"
						/>
					</div>
				</nav>
				<div className="profile__personal-info">
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
						<Input
							className="profile__input profile__input_name"
							type="text"
							name="login"
							value="login"
							placeholder="Введите имя"
							minLength="6"
							maxLength="20"
						/>
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
						<span className="error error_place_profile">
							Введите корректный email. Пример: user@mail.ru
						</span>
						{isEditing && (
							<Button
								className="form__button form__button_submit_changes"
								onClick={onSubmitNameAndEmail}
								type="submit"
								label="Сохранить изменения"
							/>
						)}
					</Form>
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
	// onEditPassword: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired,
	isLogoutPopupOpen: PropTypes.bool.isRequired,
	isDeleteAccountPopupOpen: PropTypes.bool.isRequired,
	isPasswordEditPopupOpen: PropTypes.bool.isRequired,
	onChangePasswordSubmit: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Profile;

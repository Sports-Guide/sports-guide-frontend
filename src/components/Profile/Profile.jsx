import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import { Form } from '../Form/Form';
import FormTitle from '../FormTitle/FormTitle';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export function Profile({ isEditing, onEditProfile, onDelete, onLogOut }) {
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
								onClick={onDelete}
								label="Удалить аккаунт"
							/>
						) : null}
						<Button className="button-y" onClick={onLogOut} label="Выйти" />
					</div>
				</div>
			</section>
		</main>
	);
}

Profile.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	onEditProfile: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired,
};

export default Profile;

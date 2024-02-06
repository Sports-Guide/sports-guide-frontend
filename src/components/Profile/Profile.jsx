import PropTypes from 'prop-types';
import './Profile.scss';
import { NavLink, Outlet } from 'react-router-dom';
// import FormTitle from '../FormTitle/FormTitle';
import { Popup } from '../Popup/Popup';
import PersonalDataIcon from '../../images/personal-info-icon.svg';
import PassBtnIcon from '../../images/password-lock-icon.svg';

export function Profile({
	onDelete,
	onLogOut,
	isLogoutPopupOpen,
	onLogoutPopupOpen,
	isDeleteAccountPopupOpen,
	onDeleteAccountPopupOpen,
	onClose,
}) {
	// добавить логику на сравнение полей Никнейм и Почта: если совпадают, поля неактивны

	const linkClass = ({ isActive }) =>
		isActive
			? 'profile__menu-link profile__menu-link_active'
			: 'profile__menu-link profile__menu-link_inactive';

	return (
		<main className="profile">
			<section className="profile__container">
				<nav className="profile__navigation">
					<div className="profile__menu">
						<NavLink to="/profile" className={linkClass} end>
							<img
								className="profile__menu-link-icon"
								src={PersonalDataIcon}
								alt="lock icon for a password field"
							/>
							Личные данные
						</NavLink>
						<NavLink to="password" className={linkClass}>
							<img
								className="profile__menu-link-icon"
								src={PassBtnIcon}
								alt="lock icon for a password field"
							/>
							Пароль
						</NavLink>
					</div>
					<div className="profile__menu">
						<button
							className="profile__nav-button profile__button-logout"
							onClick={onLogoutPopupOpen}
							type="button"
						>
							Выйти
						</button>
						<button
							className="profile__nav-button profile__button-account-delete"
							onClick={onDeleteAccountPopupOpen}
						>
							Удалить аккаунт
						</button>
					</div>
				</nav>
				<div className="profile__personal-info">
					<Outlet />
				</div>
			</section>
			<Popup
				isOpen={isLogoutPopupOpen}
				onClose={onClose}
				headerClassName="popup__header_left-aligned"
				title="Выход из профиля"
			>
				<h3 className="popup__title">
					Вы уверены, что хотите выйти из профиля?
				</h3>
				<div className="popup__button-container align-left">
					<button
						className="popup__button popup__button-y"
						onClick={onLogOut}
						type="button"
						aria-label="log-out-button"
					>
						Выйти
					</button>
					<button
						className="popup__button popup__button-n"
						onClick={onClose}
						type="button"
						aria-label="cancel-log-out-button"
					>
						Отмена
					</button>
				</div>
			</Popup>
			<Popup
				isOpen={isDeleteAccountPopupOpen}
				onClose={onClose}
				headerClassName="popup__header_left-aligned"
				title="Удаление профиля"
			>
				<h3 className="popup__title">
					Вы уверены, что хотите удалить профиль?
				</h3>
				<div className="popup__button-container">
					<button
						className="popup__button popup__button-y"
						onClick={onDelete}
						type="button"
						aria-label="delete-profile-button"
					>
						Удалить
					</button>
					<button
						className="popup__button popup__button-n"
						onClick={onClose}
						type="button"
						aria-label="cancel-delete-profile-button"
					>
						Отмена
					</button>
				</div>
			</Popup>
		</main>
	);
}

Profile.propTypes = {
	onDelete: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired,
	isLogoutPopupOpen: PropTypes.bool.isRequired,
	onLogoutPopupOpen: PropTypes.func.isRequired,
	isDeleteAccountPopupOpen: PropTypes.bool.isRequired,
	onDeleteAccountPopupOpen: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Profile;

import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Profile.scss';
import PersonalDataIcon from '../../images/personal-info-icon.svg';
import PassBtnIcon from '../../images/password-lock-icon.svg';
import FavouritesIcon from '../../images/favourites-icon.svg';
import MyAreasIcon from '../../images/my-areas-icon.svg';
import { openModal } from '../../services/slices/modalSlice';

export default function Profile() {
	const dispatch = useDispatch();

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
							Личные&nbsp;данные
						</NavLink>
						<NavLink to="password" className={linkClass}>
							<img
								className="profile__menu-link-icon"
								src={PassBtnIcon}
								alt="lock icon for a password field"
							/>
							Безопасность и вход
						</NavLink>
						<NavLink to="favourites" className={linkClass}>
							<img
								className="profile__menu-link-icon"
								src={FavouritesIcon}
								alt="heart icon for favourite areas section"
							/>
							Избранное
						</NavLink>
						<NavLink to="my-areas" className={linkClass}>
							<img
								className="profile__menu-link-icon"
								src={MyAreasIcon}
								alt="football ball icon for personal areas section"
							/>
							Мои площадки
						</NavLink>
					</div>
					<div className="profile__menu">
						<button
							className="profile__nav-button profile__button-logout"
							onClick={() => dispatch(openModal('logout'))}
							type="button"
						>
							Выйти
						</button>
						{/* <button
							className="profile__nav-button profile__button-account-delete"
							onClick={() => dispatch(openModal('deleteProfile'))}
						>
							Удалить аккаунт
						</button> */}
					</div>
				</nav>
				<div className="profile__personal-info">
					<Outlet />
				</div>
			</section>
		</main>
	);
}

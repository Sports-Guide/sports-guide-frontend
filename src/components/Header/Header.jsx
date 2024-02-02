import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '../Button/Button';
import { ButtonLoginSite } from '../Button/ButtonLoginSite';
import { ButtonMap } from '../Button/ButtonMap';
import logo from '../../images/logo.svg';

import { getIsUserAuth } from '../../services/selectors/userSelector';
import './Header.scss';

export function Header({ onLogIn }) {
	const isUserAuth = useSelector(getIsUserAuth);
	const navigate = useNavigate();

	const navigateHome = () => {
		navigate('app-area');
	};

	const navigateToPersonalArea = () => {
		navigate('profile');
	};

	return (
		<header className="header">
			<div className="header__container">
				<Link to="/" className="header__logo">
					<img className="logo" src={logo} alt="" />
					<h4 className="header__title">СПОРТИВНЫЙ ГИД</h4>
					<ButtonMap label="Москва" />
				</Link>
				<div className="header__buttons">
					<Button
						className="button-app"
						onClick={isUserAuth ? navigateHome : onLogIn}
						label="Добавить площадку"
					/>
					{isUserAuth ? (
						<ButtonLoginSite
							onClick={navigateToPersonalArea}
							label="Личный&nbsp;кабинет"
						/>
					) : (
						<ButtonLoginSite onClick={onLogIn} type="button" label="Войти" />
					)}
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	onLogIn: PropTypes.func.isRequired,
	// loggedIn: PropTypes.bool.isRequired,
};

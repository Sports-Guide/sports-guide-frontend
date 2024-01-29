import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { ButtonMap } from '../Button/ButtonMap';
import logo from '../../images/logo.svg';
import './Header.scss';

export function Header({ onLogIn, loggedIn }) {
	const navigate = useNavigate();

	const navigateHome = () => {
		navigate('/app-area');
	};

	const navigateToPersonalArea = () => {
		navigate('/profile');
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
						onClick={navigateHome}
						label="Добавить площадку"
					/>
					{loggedIn ? (
						<Button
							onClick={navigateToPersonalArea}
							label="Личный кабинет"
							className="button-login-site"
						/>
					) : (
						<Button
							className="button-login-site"
							onClick={onLogIn}
							type="button"
							label="Личный кабинет"
						/>
					)}
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	onLogIn: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';
import { ButtonAppSite } from '../Button/ButtonAppSite';
import { ButtonMap } from '../Button/ButtonMap';
import logo from '../../images/logo.svg';
import './Header.scss';

export function Header({ onLogIn, onLogOut, loggedIn }) {
	return (
		<header className="header">
			<div className="header__container">
				<div className="header__logo">
					<img className="logo" src={logo} alt="" />
					<h4 className="header__title">Спортивный Гид</h4>
				</div>
				<div className="header__buttons">
					<ButtonMap label="Москва" />
					{loggedIn ? (
						<Button onClick={onLogOut} label="Выйти" />
					) : (
						<Button onClick={onLogIn} label="Войти" />
					)}
					<ButtonAppSite label="Добавить площадку" />
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	onLogIn: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired,
};

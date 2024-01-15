import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoginSite } from '../Button/ButtonLoginSite';
import { Button } from '../Button/Button';
import { ButtonAppSite } from '../Button/ButtonAppSite';
import { ButtonMap } from '../Button/ButtonMap';
import logo from '../../images/logo.svg';
import './Header.scss';

export function Header({ onLogIn, onLogOut, loggedIn, onAreaApp }) {
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
						<ButtonLoginSite onClick={onLogIn} type="button" label="Войти" />
					)}
					<ButtonAppSite onClick={onAreaApp} label="Добавить площадку" />
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	onLogIn: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	onAreaApp: PropTypes.bool.isRequired,
};

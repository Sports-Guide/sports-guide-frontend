import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';
import logo from '../../images/logo.svg';
import './Header.scss';

export function Header({ onLogIn, onLogOut, loggedIn }) {
	return (
		<header className="header">
			<div className="header__container">
				<img className="logo" src={logo} alt="" />
				<nav className="menu">
					<NavLink to="/" className="menu__link">
						Домой
					</NavLink>
					<NavLink to="/reviews" className="menu__link">
						Обзоры эмодзи
					</NavLink>
					<NavLink to="/about-me" className="menu__link">
						Обо мне
					</NavLink>
				</nav>
			</div>
			{loggedIn ? (
				<Button onClick={onLogOut} label="Выйти" />
			) : (
				<Button onClick={onLogIn} label="Войти" />
			)}
		</header>
	);
}

Header.propTypes = {
	onLogIn: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired,
};

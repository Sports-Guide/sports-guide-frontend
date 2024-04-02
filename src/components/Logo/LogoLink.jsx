import React from 'react';
import './LogoLink.scss';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export function LogoLink() {
	return (
		<Link to="/" className="logo">
			<img className="logo__icon" src={logo} alt="Логотип" />
			<h4 className="logo__title">СПОРТИВНЫЙ ГИД</h4>
		</Link>
	);
}

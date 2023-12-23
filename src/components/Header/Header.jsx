import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import logo from '../../images/logo.svg';
import './Header.scss';

export function Header({ onLogIn, onLogOut, loggedIn }) {
	return (
		<header className="header">
			<div className="header__container">
				<img className="logo" src={logo} alt="" />
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

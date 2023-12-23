import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import './Header.scss';

export function Header({ onLogIn, onLogOut, loggedIn }) {
	return (
		<header className="header">
			{loggedIn ? (
				<Button onClick={onLogOut} label="Выйти" />
			) : (
				<Button onClick={onLogIn} label="Войти" />
			)}
			<h1>Привет</h1>
		</header>
	);
}

Header.propTypes = {
	onLogIn: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired,
};

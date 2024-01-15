import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './ButtonOnLoginPopUp.scss';

export function ButtonOnLoginPopUp({ onClick, type, disabled, label }) {
	return (
		<NavLink
			className="popup__register-form-link-to-signin"
			onClick={onClick}
			type={type}
			disabled={disabled}
			href="#sign-in"
		>
			{label}
		</NavLink>
	);
}

ButtonOnLoginPopUp.propTypes = {
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

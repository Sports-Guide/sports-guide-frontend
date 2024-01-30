import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './ButtonOnRegister.scss';

export function ButtonOnRegister({ onClick, type, disabled, label }) {
	return (
		<NavLink
			className="popup__login-form-link-to-signup"
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{label}
		</NavLink>
	);
}

ButtonOnRegister.propTypes = {
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

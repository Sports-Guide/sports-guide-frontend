import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './ButtonOnPasswordRecovery.scss';

export function ButtonOnPasswordRecovery({ onClick, type, disabled, label }) {
	return (
		<NavLink
			className="popup__login-form-link-recover"
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{label}
		</NavLink>
	);
}

ButtonOnPasswordRecovery.propTypes = {
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

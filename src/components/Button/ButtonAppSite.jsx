import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './ButtonAppSite.scss';

export function ButtonAppSite({ onClick, type, disabled, label }) {
	return (
		<NavLink
			className="button-app"
			onClick={onClick}
			type={type}
			disabled={disabled}
			to="/app-area"
		>
			{label}
		</NavLink>
	);
}

ButtonAppSite.propTypes = {
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

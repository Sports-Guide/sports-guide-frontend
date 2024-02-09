import PropTypes from 'prop-types';
import './ButtonLoginSite.scss';

export function ButtonLoginSite({ onClick, type, disabled, label }) {
	return (
		<button
			className="button-login-site"
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	);
}

ButtonLoginSite.propTypes = {
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

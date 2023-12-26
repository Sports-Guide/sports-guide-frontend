import PropTypes from 'prop-types';
import './ButtonAppSite.scss';

export function ButtonAppSite({ onClick, type, disabled, label }) {
	return (
		<button
			className="button-app"
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	);
}

ButtonAppSite.propTypes = {
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

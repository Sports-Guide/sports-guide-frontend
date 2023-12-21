import PropTypes from 'prop-types';
import './Button.scss';

export function Button({ onClick, type, disabled, label }) {
	return (
		<button
			className="button"
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	);
}

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

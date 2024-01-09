import PropTypes from 'prop-types';
import './Button.scss';

export function Button({ className, onClick, type, disabled, label }) {
	return (
		<button
			className={`button ${className}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	);
}

Button.propTypes = {
	className: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string,
};

Button.defaultProps = {
	label: null,
	type: 'button',
};

export default Button;

import PropTypes from 'prop-types';
import './Button.scss';

export function Button({
	children,
	startIcon,
	endIcon,
	label,
	onClick,
	type,
	btnStyle,
	size,
	disabled,
}) {
	return (
		<button
			className={`button button_${btnStyle} button_${size}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{startIcon && { children }}
			{label}
			{endIcon && { children }}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node,
	startIcon: PropTypes.bool,
	endIcon: PropTypes.bool,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	btnStyle: PropTypes.oneOf(['primary', 'secondary', 'flat']),
	size: PropTypes.oneOf(['big', 'small']),
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	children: null,
	startIcon: false,
	endIcon: false,
	label: '',
	type: 'button',
	disabled: false,
	btnStyle: 'primary',
	size: 'big',
};

export default Button;

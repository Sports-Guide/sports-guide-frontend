import PropTypes from 'prop-types';
import './ButtonOld.scss';

export function ButtonOld({ className, onClick, type, disabled, label }) {
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

ButtonOld.propTypes = {
	className: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string,
};

ButtonOld.defaultProps = {
	label: null,
	type: 'button',
};

export default ButtonOld;

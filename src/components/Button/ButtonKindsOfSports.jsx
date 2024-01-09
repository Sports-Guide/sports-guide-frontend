import PropTypes from 'prop-types';
import './ButtonKindsOfSports.scss';

export function ButtonKindsOfSports({ onClick, type, disabled, label, ball }) {
	return (
		<button
			className={`button-kinds-of-sports ball ${ball}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	);
}

ButtonKindsOfSports.propTypes = {
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	ball: PropTypes.string.isRequired,
};

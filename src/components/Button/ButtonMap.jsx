import PropTypes from 'prop-types';
import './Button.scss';
import './ButtonMap.scss';
import ButtonLocation from '../../images/mdi_location.svg';

export function ButtonMap({ onClick, type, disabled, label }) {
	return (
		<div className="button-container">
			<img
				src={ButtonLocation}
				alt="Локация"
				className="button-container__marker"
			/>
			<button
				className="button"
				onClick={onClick}
				type={type}
				disabled={disabled}
			>
				{label}
			</button>
		</div>
	);
}

ButtonMap.propTypes = {
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

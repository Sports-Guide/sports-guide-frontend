import './Input.scss';
import PropTypes from 'prop-types';

export function Input({
	onChange,
	value,
	type,
	placeholder,
	name,
	minLength,
	maxLength,
}) {
	return (
		<input
			className="input"
			onChange={onChange}
			value={value}
			type={type}
			placeholder={placeholder}
			name={name}
			minLength={minLength}
			maxLength={maxLength}
		/>
	);
}

Input.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	minLength: PropTypes.string.isRequired,
	maxLength: PropTypes.string.isRequired,
};

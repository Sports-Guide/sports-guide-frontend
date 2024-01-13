import './Input.scss';
import PropTypes from 'prop-types';

export function Input({
	className,
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
			className={`input ${className}`}
			onChange={onChange}
			value={value}
			type={type}
			placeholder={placeholder}
			id={name}
			name={name}
			minLength={minLength}
			maxLength={maxLength}
			autoComplete="off"
		/>
	);
}

Input.propTypes = {
	className: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	minLength: PropTypes.string.isRequired,
	maxLength: PropTypes.string.isRequired,
};

export default Input;

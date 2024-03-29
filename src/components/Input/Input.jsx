import React from 'react';
import './Input.scss';
import PropTypes from 'prop-types';

export function Input({
	label,
	htmlFor,
	labelClassName,
	inputClassName,
	onChange,
	value,
	type,
	placeholder,
	name,
	minLength,
	maxLength,
	children,
}) {
	return (
		<div className={`input__container ${labelClassName}`}>
			<label className="input-label" htmlFor={htmlFor}>
				{label}
			</label>
			<input
				className={inputClassName}
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
			{children}
		</div>
	);
}

Input.propTypes = {
	label: PropTypes.string.isRequired,
	labelClassName: PropTypes.string.isRequired,
	inputClassName: PropTypes.string.isRequired,
	htmlFor: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	minLength: PropTypes.string.isRequired,
	maxLength: PropTypes.string.isRequired,
	children: PropTypes.node,
};

Input.defaultProps = {
	children: null,
};

export default Input;

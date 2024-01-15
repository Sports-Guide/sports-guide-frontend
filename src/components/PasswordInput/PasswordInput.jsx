import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PasswordInput.scss';

export const PasswordInput = ({
	label,
	htmlFor,
	idName,
	name,
	minLength,
	maxLength,
	errorMessage,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="password-input-container">
			<label className="password-label" htmlFor={htmlFor}>
				{label}
			</label>
			<input
				className="password-input"
				type={showPassword ? 'text' : 'password'}
				id={idName}
				name={name}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				minLength={minLength}
				maxLength={maxLength}
				autoComplete="off"
			/>
			<span className="password-error password-error_active">
				{errorMessage}
			</span>
			<button
				className="password-show-hide-button"
				type="button"
				onClick={togglePasswordVisibility}
				aria-label="show-hide-password"
			/>
		</div>
	);
};

PasswordInput.propTypes = {
	label: PropTypes.string.isRequired,
	htmlFor: PropTypes.string.isRequired,
	idName: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	minLength: PropTypes.string.isRequired,
	maxLength: PropTypes.string.isRequired,
	errorMessage: PropTypes.string.isRequired,
};

export default PasswordInput;

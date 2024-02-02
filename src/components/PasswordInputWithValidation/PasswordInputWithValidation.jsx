import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import './PasswordInputWithValidation.scss';
import PropTypes from 'prop-types';

export function PasswordInputWithValidation({
	label,
	htmlFor,
	labelClassName,
	inputContainerClassName,
	inputClassName,
	errorClassName,
	name,
	loginBtnClassName,
	passwordBtnClassName,
	control,
	rules,
}) {
	const location = useLocation();

	const locationsForButton = ['/profile/password', '/registration', '/login'];

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<label className={labelClassName} htmlFor={htmlFor}>
				{label}
			</label>
			<div className={inputContainerClassName}>
				<Controller
					name={name}
					control={control}
					// defaultValue={value}
					render={({ field, fieldState }) => (
						<>
							<input
								className={inputClassName}
								{...field}
								value={field.value || ''}
								type={showPassword ? 'text' : 'password'}
								autoComplete="off"
							/>
							{fieldState?.error && (
								<span className={errorClassName}>
									{fieldState?.error?.message}
								</span>
							)}
						</>
					)}
					rules={rules}
				/>
				{locationsForButton.includes(location.pathname) ? (
					<button
						className={
							location.pathname === '/profile/password'
								? passwordBtnClassName
								: loginBtnClassName
						}
						type={showPassword ? 'button' : 'submit'}
						onClick={togglePasswordVisibility}
						aria-label="show-hide-password"
					/>
				) : null}
			</div>
		</>
	);
}

PasswordInputWithValidation.propTypes = {
	label: PropTypes.string.isRequired,
	labelClassName: PropTypes.string.isRequired,
	inputContainerClassName: PropTypes.string.isRequired,
	inputClassName: PropTypes.string.isRequired,
	errorClassName: PropTypes.string.isRequired,
	htmlFor: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	loginBtnClassName: PropTypes.string.isRequired,
	passwordBtnClassName: PropTypes.string.isRequired,
	control: PropTypes.shape({
		register: PropTypes.func.isRequired,
		// unregister: PropTypes.func.isRequired,
		// setValue: PropTypes.func.isRequired,
	}).isRequired,
	rules: PropTypes.shape({}),
};

PasswordInputWithValidation.defaultProps = {
	rules: {},
};

export default PasswordInputWithValidation;

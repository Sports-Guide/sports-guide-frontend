import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

export function Form({ children, className, onSubmit }) {
	return (
		<form onSubmit={onSubmit} className={`form ${className}`}>
			{children}
		</form>
	);
}

Form.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
	className: '',
};

export default Form;

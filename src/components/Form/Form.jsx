import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

export function Form({ children, className }) {
	return <form className={`form ${className}`}>{children}</form>;
}

Form.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string.isRequired,
};

export default Form;

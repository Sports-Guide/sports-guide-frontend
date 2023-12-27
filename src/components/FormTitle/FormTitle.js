import React from 'react';
import PropTypes from 'prop-types';

function FormTitle({ label, className }) {
	return <h3 className={`form__title ${className}`}>{label}</h3>;
}

FormTitle.propTypes = {
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
};

FormTitle.defaultProps = {
	className: 'form__title',
};

export default FormTitle;

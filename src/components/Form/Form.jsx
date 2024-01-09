import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

export function Form({ children }) {
	return <form className="form form_place_profile">{children}</form>;
}

Form.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Form;

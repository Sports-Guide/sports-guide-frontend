import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputCheckboxLogin.scss';

export default function InputCheckboxLogin({ inputId, children }) {
	return (
		<div className="checkbox-login__container">
			<label htmlFor={inputId} className="checkbox__label">
				<Field
					id={inputId}
					type="checkbox"
					name={inputId}
					className="checkbox__input"
				/>
				{children}
			</label>
			<div className="checkbox__error-container">
				<ErrorMessage
					className="input__error"
					component="span"
					name={inputId}
				/>
			</div>
		</div>
	);
}

InputCheckboxLogin.propTypes = {
	inputId: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputCheckboxRegister.scss';

export default function InputCheckboxRegister({ inputId, children }) {
	return (
		<div className="checkbox-register__container">
			<label htmlFor={inputId} className="checkbox-input__label">
				<Field
					id={inputId}
					type="checkbox"
					name={inputId}
					className="checkbox-input"
				/>
				{children}
			</label>
			<div className="checkbox__error-container">
				<ErrorMessage
					className="checkbox__error"
					component="span"
					name={inputId}
				/>
			</div>
		</div>
	);
}

InputCheckboxRegister.propTypes = {
	inputId: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

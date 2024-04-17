import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputContainer.scss';

export default function InputContainer({ labelText, inputId, children }) {
	return (
		<div className="input__container">
			<label htmlFor={inputId} className="input__label">
				{labelText}
				{children}
			</label>
			<div className="input__text-error-container">
				<ErrorMessage
					className="input__text-error"
					component="span"
					name={inputId}
				/>
			</div>
		</div>
	);
}

InputContainer.propTypes = {
	labelText: PropTypes.string.isRequired,
	inputId: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

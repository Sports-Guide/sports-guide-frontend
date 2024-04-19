import PropTypes from 'prop-types';
import { Field } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputCheckboxLogin.scss';

export default function InputCheckboxLogin({ inputId, children }) {
	return (
		<div className="checkbox-login__container">
			<label htmlFor={inputId} className="checkbox-input__label">
				<Field
					id={inputId}
					type="checkbox"
					name={inputId}
					className="checkbox-input"
				/>
				{children}
			</label>
		</div>
	);
}

InputCheckboxLogin.propTypes = {
	inputId: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputContainer.scss';

export function InputContainer({ labelText, id, name, children }) {
	return (
		<div className="input__container">
			<label htmlFor={id} className="input__label">
				{labelText}
				{children}
			</label>
			<ErrorMessage className="input__error" component="span" name={name} />
		</div>
	);
}

export default InputContainer;

InputContainer.propTypes = {
	labelText: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

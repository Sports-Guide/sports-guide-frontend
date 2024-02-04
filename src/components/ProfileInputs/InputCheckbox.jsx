import PropTypes from 'prop-types';
import { Field } from 'formik'; // https://formik.org/ - документация библиотеки formik
import './InputCheckbox.scss';

export function InputCheckbox({ labelText }) {
	return (
		<div className="checkbox__container">
			<label htmlFor="rememberMe" className="checkbox__label">
				<Field
					id="rememberMe"
					type="checkbox"
					name="rememberMe"
					className="checkbox__input"
				/>
				{labelText}
			</label>
		</div>
	);
}

export default InputCheckbox;

InputCheckbox.propTypes = {
	labelText: PropTypes.string.isRequired,
};

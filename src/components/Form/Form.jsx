import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './Form.scss';

export function Form({ label }) {
	return (
		<form>
			<Input />
			<Button label={label} />
		</form>
	);
}

Form.propTypes = {
	label: PropTypes.string.isRequired,
};

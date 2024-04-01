import PropTypes from 'prop-types';
import './Button.scss';

// в startIcon и endIcon - передаются svg компоненты
// label - текст кнопки
// type - стандартные типы кнопок button, submit, reset
// btnStyle - позволяет задать один из стилей кнопок primary - на синем фоне светлый текст, secondary - на светло-голубом фоне синий текст, flat - серый текст без фона. Заданы стили для hover focus.
// size - задает высоту кнопки(big - 44px, small-36px) и стиль текста
// customStyle - позволяет настроить кастомные стили для кнопок, при этом отключает стили заданные через параметры btnStyle и size
// disabled - отключает кнопку
// onClick - функция
// ariaLabel - строка для описания функции кнопки для технологий чтения с экрана

export function Button({
	startIcon,
	endIcon,
	label,
	type,
	btnStyle,
	size,
	customStyle,
	disabled,
	onClick,
	ariaLabel,
}) {
	return (
		<button
			className={
				!customStyle
					? `default-button default-button_${btnStyle} default-button_${size}`
					: customStyle
			}
			onClick={onClick}
			type={type}
			disabled={disabled}
			aria-label={ariaLabel}
		>
			{startIcon}
			{label}
			{endIcon}
		</button>
	);
}

Button.propTypes = {
	startIcon: PropTypes.node,
	endIcon: PropTypes.node,
	label: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	btnStyle: PropTypes.oneOf(['primary', 'secondary', 'flat']),
	size: PropTypes.oneOf(['big', 'small']),
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	customStyle: PropTypes.string,
	ariaLabel: PropTypes.string,
};

Button.defaultProps = {
	startIcon: null,
	endIcon: null,
	label: null,
	type: 'button',
	disabled: false,
	btnStyle: null,
	size: null,
	customStyle: null,
	ariaLabel: '',
};

export default Button;

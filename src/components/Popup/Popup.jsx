import React from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

export function Popup({
	isOpen,
	handleClose,
	title,
	headerClassName,
	children,
}) {
	// Остановливает закрытие попапа при нажатии на основной контент
	const stopPropagation = (e) => e.stopPropagation();

	// Функция для обработки нажатий клавиш
	const handleKeyPress = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleClose();
		}
	};

	return (
		<div
			className={`popup ${isOpen ? 'popup_opened' : ''}`}
			onClick={handleClose}
			role="button" // Добавление роли
			tabIndex="0" // Делаем элемент фокусируемым
			onKeyDown={handleKeyPress}
		>
			<div
				className="popup__container"
				onClick={stopPropagation}
				role="presentation" // Добавление роли
			>
				<button
					className="popup__close-button"
					type="button"
					onClick={handleClose}
					aria-label="close-popup-button"
				/>
				<h2 className={`popup__header ${headerClassName}`}>{title}</h2>
				{children}
			</div>
		</div>
	);
}

Popup.propTypes = {
	isOpen: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	headerClassName: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Popup.defaultProps = {
	headerClassName: '',
	isOpen: false,
};

export default Popup;

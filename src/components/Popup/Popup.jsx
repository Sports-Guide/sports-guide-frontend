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

	return (
		/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
		<div
			className={`popup ${isOpen ? 'popup_opened' : ''}`}
			onClick={handleClose}
		>
			<div className="popup__container" onClick={stopPropagation}>
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

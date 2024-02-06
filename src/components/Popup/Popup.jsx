import React from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

export function Popup({ handleClose, title, children }) {
	// Останавливает закрытие попапа при нажатии на основной контент
	const stopPropagation = (e) => e.stopPropagation();

	return (
		/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
		<div className="popup" onClick={handleClose}>
			<div className="popup__container" onClick={stopPropagation}>
				<button
					className="popup__close-button"
					type="button"
					onClick={handleClose}
					aria-label="close-popup-button"
				/>
				<h2 className="popup__title">{title}</h2>
				{children}
			</div>
		</div>
	);
}

Popup.propTypes = {
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Popup;

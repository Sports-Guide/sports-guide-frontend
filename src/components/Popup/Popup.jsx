import React from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

export function Popup({ isOpen, onClose, title, headerClassName, children }) {
	return (
		<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button
					className="popup__close-button"
					type="button"
					onClick={onClose}
					aria-label="close-popup-button"
				/>
				<h2 className={`popup__header ${headerClassName}`}>{title}</h2>
				{children}
			</div>
		</div>
	);
}

Popup.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	headerClassName: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Popup;

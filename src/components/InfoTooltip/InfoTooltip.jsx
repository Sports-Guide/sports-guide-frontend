import React from 'react';
import PropTypes from 'prop-types';
import './InfoTooltip.scss';

export function InfoTooltip({
	isInfoTooltipOpen,
	onInfoTooltipClose,
	successMessage,
	children,
}) {
	return (
		<div className={`popup ${isInfoTooltipOpen && 'popup_opened'}`}>
			<div className="popup__container">
				<button
					className="popup__close-button"
					type="button"
					onClick={onInfoTooltipClose}
					aria-label="close-popup-button"
				/>
				<h2 className="popup-tooltip__title">{successMessage}</h2>
				{children}
			</div>
		</div>
	);
}

InfoTooltip.propTypes = {
	isInfoTooltipOpen: PropTypes.bool.isRequired,
	onInfoTooltipClose: PropTypes.func.isRequired,
	successMessage: PropTypes.string.isRequired,
	children: PropTypes.node,
};

InfoTooltip.defaultProps = {
	children: null,
};

export default InfoTooltip;

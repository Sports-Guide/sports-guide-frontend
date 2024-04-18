import React, { FC, ReactNode } from 'react';
import './Popup.scss';

export type TPopupProps = {
	handleClose: () => void;
	title: string;
	titleStyle: string;
	children: ReactNode;
};

export const Popup: FC<TPopupProps> = ({
	handleClose,
	title,
	titleStyle,
	children,
}) => {
	// Останавливает закрытие попапа при нажатии на основной контент
	const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

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
				<h2 className={`${titleStyle} popup__title`}>{title}</h2>
				{children}
			</div>
		</div>
	);
};

export default Popup;

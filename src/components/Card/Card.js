import React from 'react';
import photo from '../../images/Frame 36.png';
import icon from '../../images/Frame 39.png';
import chat from '../../images/basil_cross-outline.png';
import './Card.css';

export function Card() {
	return (
		<div className="card-container">
			<img className="card-photo" src={photo} alt="place" />
			<img className="card-icon" src={icon} alt="icon" />
			<h2 className="card-title">Футбольное поле</h2>
			<p className="card-adress">
				Россия, Москва, Южный административный округ, район Зябликово
			</p>
			<div className="chat-container">
				<img className="chat-icon" src={chat} alt="chat" />
				<span className="chat-number">(15)</span>
			</div>
		</div>
	);
}

export default Card;

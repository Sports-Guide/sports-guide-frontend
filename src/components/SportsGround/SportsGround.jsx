import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './SportsGround.css';
import { Button } from '../Button/Button';
import MapComponent from '../Map/Map';
import { Comment } from '../Comment/Comment';

export function SportsGround() {
	const comments = [
		{
			author: 'John',
			date: '31/12/23',
			text: 'Норм',
		},
		{
			author: 'John',
			date: '31/12/23',
			text: 'Норм',
		},
		{
			author: 'John',
			date: '31/12/23',
			text: 'Норм',
		},
	];

	return (
		<main className="sports-ground">
			<NavLink to="/" className="nav-link">
				К выбору площадки
			</NavLink>
			<h1 className="page-title">Футбольное поле</h1>
			<p className="adress">
				Россия, Москва, Южный административный округ, район Зябликово
			</p>
			<Button />
			<div className="media">
				<div className="photo-container">
					<image className="photo" />
				</div>
				<MapComponent className="map-container_place_sport" />
			</div>
			<div>
				<Button />
				<Button />
			</div>
			<div>
				<h2>Комментарии</h2>
				<div className="comments-container">
					{comments.map((comment) => (
						<Comment
							author={comment.author}
							date={comment.date}
							text={comment.text}
						/>
					))}
				</div>
			</div>
		</main>
	);
}

export default SportsGround;

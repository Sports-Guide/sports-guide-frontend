import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SportsGround.css';
import { Button } from '../Button/Button';
import MapComponent from '../Map/Map';
import { Comment } from '../Comment/Comment';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { Slider } from '../Slider/Slider';
import ImageF from '../../images/Kavkazskie_gory.jpg';
import ImageT from '../../images/Moench_2339.jpg';
import ImageTh from '../../images/1b5ff838-4a02-11ed-933f-3a23cf4bb419.1220x600.jpeg';

export function SportsGround({ onCommentSubmit }) {
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
			<div className="media">
				<div className="photo-container">
					<Slider>
						<img className="photo" alt="mountains" src={ImageF} />
						<img className="photo" alt="mountains" src={ImageT} />
						<img className="photo" alt="mountains" src={ImageTh} />
					</Slider>
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
				<Form className="comment-form">
					<Input className="comment-input" placeholder="Напишите сообщение" />
					<span className="comment-caption">0 / 2000 символов</span>
					<Button
						className="comment-submit-button"
						onClick={onCommentSubmit}
						label="Отправить"
					/>
				</Form>
			</div>
		</main>
	);
}

SportsGround.propTypes = {
	onCommentSubmit: PropTypes.func.isRequired,
};

export default SportsGround;

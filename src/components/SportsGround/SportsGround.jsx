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
import { photos } from '../../constants/SliderConstants';

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
			<NavLink to="/" className="sports-ground__link">
				← К выбору площадки
			</NavLink>
			<h1 className="sports-ground__title">Спортивная площадка</h1>
			<div className="sports-ground__adress-container">
				<div className="sports-ground__adress-icon" />
				<p className="sports-ground__adress">
					Россия, Москва, Южный административный округ, район Зябликово
				</p>
			</div>
			{/* <div className="photo-container"> */}
			<Slider>
				{photos.map((photo) => (
					<img
						className="sports-ground__photo"
						src={photo.photoUrl}
						alt="Площадка"
					/>
				))}
			</Slider>
			{/* </div> */}
			<div className="category-section">
				<h2 className="category-title">Виды спорта</h2>
				<div className="category-container">
					<div className="category">
						<div className="category-icon" />
						<p className="category-name">Футбол</p>
					</div>
					<div className="category">
						<div className="category-icon" />
						<p className="category-name">Баскетбол</p>
					</div>
				</div>
			</div>
			<div className="comments-section">
				<h2 className="comments-title">Комментарии</h2>
				<div className="comments-container">
					{comments.map((comment) => (
						<Comment
							author={comment.author}
							date={comment.date}
							text={comment.text}
						/>
					))}
				</div>
				<Form className="form_place_comments">
					<Input
						className="comment-input"
						placeholder="Напишите сообщение"
						type="text"
						name="comments"
					/>
					<div className="comment-submit">
						<span className="comment-caption">0 / 2000 символов</span>
						<Button
							className="comment-submit-button"
							onClick={onCommentSubmit}
							label="Отправить"
						/>
					</div>
				</Form>
				<MapComponent className="map-container_place_sport" />
			</div>
		</main>
	);
}

SportsGround.propTypes = {
	onCommentSubmit: PropTypes.func.isRequired,
};

export default SportsGround;

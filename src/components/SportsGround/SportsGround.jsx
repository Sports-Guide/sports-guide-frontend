import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SportsGround.css';
import { Map, Placemark } from '@pbe/react-yandex-maps';
import { Button } from '../Button/Button';
import { Comment } from '../Comment/Comment';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { Slider } from '../Slider/Slider';
import { bordersOfRussia } from '../../constants/MapConstants';

export function SportsGround({ onCommentSubmit, areas }) {
	const { id } = useParams();

	const [mapState, setMapState] = useState({
		center: [37.618879, 55.751426],
		zoom: 12,
		controls: ['zoomControl', 'fullscreenControl'],
	});

	const selectedArea = areas.find((area) => area.id.toString() === id);

	useEffect(() => {
		if (selectedArea) {
			const latitude = parseFloat(selectedArea.latitude);
			const longitude = parseFloat(selectedArea.longitude);
			setMapState((prevState) => ({
				...prevState,
				center: [latitude, longitude],
			}));
		}
	}, [selectedArea]);

	if (!selectedArea) {
		return <div className="sports-ground__not-found">Площадка не найдена</div>;
	}

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
			{/* <NavLink to="/" className="sports-ground__link">
				← К выбору площадки
			</NavLink> */}
			<h1 className="sports-ground__title">{selectedArea.name}</h1>
			<div className="sports-ground__adress-container">
				<div className="sports-ground__adress-icon" />
				<p className="sports-ground__adress">{selectedArea.address}</p>
			</div>
			<div className="sports-ground__button-container">
				<button className="sports-ground__button">
					<p className="sports-ground__button-like" />
					<p className="sports-ground__button-text">Добавить в избранное</p>
				</button>
				<button className="sports-ground__button">
					<p className="sports-ground__button-warning" />
					<p className="sports-ground__button-text">Сообщить о неточности</p>
				</button>
			</div>
			<Slider>
				{selectedArea.images.map((imageObj) => (
					<img
						key={imageObj.image}
						className="sports-ground__photo"
						src={imageObj.image}
						alt="Площадка"
					/>
				))}
			</Slider>
			{/* </div> */}
			<div className="category-section">
				<h2 className="category-title">Виды спорта</h2>
				<div className="category-container">
					{selectedArea.categories.map((category) => (
						<span className="category-background">
							<img
								src={category.icon}
								alt="знак категории"
								className="category-ball"
							/>
							<span key={category.id} className="category-name">
								{category.name}
							</span>
						</span>
					))}
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
				<Map
					state={mapState}
					className="map__container"
					options={{
						restrictMapArea: bordersOfRussia,
					}}
				>
					<Placemark
						key={selectedArea.id}
						geometry={[
							parseFloat(selectedArea.latitude),
							parseFloat(selectedArea.longitude),
						]}
						properties={{
							balloonContentBody: `
								   <a class = "yandex-link" target="_blank" href=/sports-ground/${
											selectedArea.id
										}>
									<div class = "yandex">
									<img class = "yandex__images" src="${selectedArea.images[0].image}">
									<div class = "yandex__contetn">
									<h1 class = "yandex__title" >${selectedArea.name}</h1>
									<p class = "yandex__subtitle">${selectedArea.description}</p>
									<div class = "yandex__categories">
									<div class = "yandex__category">
									<img class = "yandex__small-img" src="https://avatars.mds.yandex.net/i?id=67ce2d97b46eb337086a0e3dde047b5a0815933b-4219583-images-thumbs&n=13" alt="значек категории">
									<p class = "yandex__small-text">${selectedArea.categories.map(
										(categor) => categor.name
									)}</p>
									</div>
									</div>
									</div>
									</div>
									</a>
									`,
						}}
						options={{
							preset: 'islands#blueSportIcon',
							controls: [],
							visible: true,
							cursor: 'pointer',
						}}
					/>
				</Map>
			</div>
		</main>
	);
}

SportsGround.propTypes = {
	onCommentSubmit: PropTypes.func.isRequired,
	areas: PropTypes.arrayOf.isRequired,
};

export default SportsGround;

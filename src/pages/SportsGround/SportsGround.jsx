import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SportsGround.css';
import { Map, Placemark } from '@pbe/react-yandex-maps';
import { Slider } from '../../components/Slider/Slider';
import { bordersOfRussia, defaultState } from '../../constants/MapConstants';
import { areasList } from '../../services/selectors/areaSelector';
import ButtonLike from '../../components/Button/ButtonLike';

export default function SportsGround() {
	const { id } = useParams();
	const areas = useSelector(areasList);
	const [mapState, setMapState] = useState(defaultState);

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

	return (
		<main className="sports-ground">
			<div className="sports-ground__data">
				<h2 className="sports-ground__title">{selectedArea.name}</h2>
				<div className="sports-ground__adress-container">
					<div className="sports-ground__adress-icon" />
					<p className="sports-ground__adress">{selectedArea.address}</p>
				</div>
				<div className="sports-ground__button-container">
					<ButtonLike area={selectedArea} />
					<button className="sports-ground__button">
						<p className="sports-ground__button-warning" />
						<p className="sports-ground__button-text">Сообщить о неточности</p>
					</button>
				</div>
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
			<div className="category-section">
				<h3 className="category-title">Виды спорта</h3>
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
			<div className="sports-ground__description">
				<h3 className="sports-ground__title">О площадке</h3>
				<p className="sports-ground__subtitle">{selectedArea.description}</p>
			</div>
			<div className="sports-ground__map">
				<h3 className="sports-ground__title">Расположение</h3>
				<Map
					state={mapState}
					className="sports-ground__map-container"
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
								
									<div class = "yandex">
									<img class = "yandex__images" src="${selectedArea.images[0].image}">
									<div class = "yandex__contetn">
									<h1 class = "yandex__title" >${selectedArea.name}</h1>
									<p class = "yandex__subtitle">${selectedArea.description}</p>
									<div class = "yandex__categories">
									${selectedArea.categories
										.map(
											(categor) =>
												`<div class = "yandex__category">
											<img class = "yandex__small-img" src="${categor.icon}" alt="значек категории">
											<p class = "yandex__small-text">${categor.name}</p>
											</div>`
										)
										.join('')}
									</div>
									</div>
									</div>
									
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

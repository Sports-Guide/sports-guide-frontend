/* eslint-disable */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './YandexMap.scss';
import { Map, Placemark, Clusterer, Polygon } from '@pbe/react-yandex-maps';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import * as api from '../../utils/MainApi';
import buttonMap from '../../images/buttonMap.png';

import {
	displayBorder,
	bordersOfRussia,
	areasCoord,
} from '../../constants/MapConstants';

function YandexMap({ areas, setCoordinate, setAdressText, placeholder }) {
	const ref = useRef();
	const location = useLocation();
	const areaPath = location.pathname === '/app-area';
	const [points, setPoints] = useState([]);
	const [coordsForArea, setCoordsForArea] = useState([]);
	const [address, setAddress] = useState('');
	const [selectedArea, setSelectedArea] = useState('');
	const [isPolygonShow, setIsPolygonShow] = useState(false);
	const [areasToShow, setAreasToShow] = useState([]);
	const [mapState, setMapState] = useState({
		center: [37.618879, 55.751426],
		zoom: 10,
		controls: ['zoomControl', 'fullscreenControl'],
	});
	const areasToDisplay = areasToShow.length > 0 ? areasToShow : areas;

	//рендер границ округов
	useEffect(() => {
		if (selectedArea) {
			api
				.getCoords(selectedArea)
				.then((data) => {
					if (data && data.length > 0) {
						const firstResult = data[0];
						if (firstResult.geojson && firstResult.geojson.coordinates) {
							const polygonCoordinates = firstResult.geojson.coordinates;
							let modifiedCoordinates = [];
							if (
								polygonCoordinates.every((subArray) => subArray.length === 1)
							) {
								modifiedCoordinates = polygonCoordinates.flat();
							} else {
								modifiedCoordinates = polygonCoordinates;
							}
							setCoordsForArea(modifiedCoordinates);
						} else {
							console.error('Полигон не найден в ответе API');
						}
					} else {
						console.error('Данные не получены от API');
					}
				})
				.catch((error) => {
					console.error('Ошибка при выполнении запроса:', error);
				});
		}
	}, [selectedArea]);

	//Добавление клика на карту, запись адреса и координат в стейт
	const handleMapClick = useCallback((e, ymaps) => {
		const point = e.get('coords');
		setPoints([point]);
		setCoordinate([point]);
		ymaps.geocode(point).then((res) => {
			const firstGeoObject = res.geoObjects.get(0);
			const addressLine = firstGeoObject.getAddressLine();
			setAddress(addressLine);
			setAdressText(addressLine);
		});
	}, []);

	const handleChange = (e) => {
		setAddress(e.target.value);
	};

	const loadSuggest = (ymaps) => {
		// Подключение поисковой подсказки
		const suggestView = new ymaps.SuggestView('suggest', {
			// ограничение зоны поисковой подсказки
			boundedBy: displayBorder,
			strictBounds: displayBorder,
		});
		let selectedItem = null;
		// Получение коодинат по поисковому запросу
		suggestView.events.add('select', (event) => {
			selectedItem = event.get('item');
			setAddress(selectedItem.value);
			ymaps
				.geocode(selectedItem.value, {
					results: 2,
				})
				.then((res) => {
					const firstGeoObject = res.geoObjects.get(0);
					// координаты запрашиваемого обьекта
					const coords = firstGeoObject.geometry.getCoordinates();
					// координаты для корректного зума карты
					const bounds = firstGeoObject.properties.get('boundedBy');
					// обновление стейтов
					ref.current.setBounds(bounds, { checkZoomRange: true });
					setPoints([coords]);
					setMapState((prevState) => ({
						...prevState,
						center: coords,
					}));
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	//Зум при выборе округа
	const handleAreaChange = (event) => {
		setIsPolygonShow(true);
		const selectedArea = event.target.value;
		areasCoord.find((area) => {
			const { place, coords } = area;
			if (place === selectedArea) {
				return ref.current.setBounds(coords, { checkZoomRange: true });
			}
			return null;
		});
		if (selectedArea === 'Все округа') {
			return setSelectedArea('город Москва');
		}
		setSelectedArea(selectedArea);
	};

	const handleCategoryChange = (event) => {
		const selectedCategory = event.target.value;
		// console.log(selectedCategory);
		if (selectedCategory === 'Вид спорта') {
			return setAreasToShow(areas);
		}
		const filteredAreas = areas.filter((area) =>
			area.categories.some((category) => category.name === selectedCategory)
		);
		console.log(filteredAreas);
		setAreasToShow(filteredAreas);
	};

	return (
		<div className={areaPath ? 'map_area-app' : 'map'}>
			<div className="map__inputs map__inputs_aprea">
				<button
					className={areaPath ? 'map__button_none' : 'map__button'}
				></button>
				<select
					type="text"
					className="map__search-bar map__search-bar_kinds-of-sports"
					onChange={handleCategoryChange}
				>
					<option selected>Вид спорта</option>
					<option>Футбол</option>
					<option>Баскетбол</option>
					<option>Волейбол</option>
					<option>Теннис</option>
					<option>Воркаут</option>
				</select>
				<select
					type="text"
					className="map__search-bar map__search-bar_area"
					onChange={handleAreaChange}
				>
					<option selected>Все округа</option>
					<option>Центральный округ</option>
					<option>Северный округ</option>
					<option>Северо-Восточный округ</option>
					<option>Восточный округ</option>
					<option>Юго-Восточный округ</option>
					<option>Южный округ</option>
					<option>Юго-Западный округ</option>
					<option>Западный округ</option>
					<option>Северо-Западный округ</option>
					<option>Зеленоградский округ</option>
				</select>
				<input
					type="text"
					className="map__search-bar map__search-bar_type_search"
					id="suggest"
					placeholder={placeholder}
					onChange={handleChange}
					value={address}
				/>
			</div>

			<Map
				instanceRef={ref}
				state={mapState}
				className="map__container"
				modules={['SuggestView', 'geocode', 'coordSystem.geo']}
				onLoad={(ymaps) => {
					loadSuggest(ymaps);
					if (areaPath) {
						//добавление клика на карту
						ref.current.events.add('click', (e) => handleMapClick(e, ymaps));
					}
					//отслеживание зума
					ref.current.events.add('boundschange', (e) => {
						const newZoom = e.get('newZoom');
						if (newZoom >= 13) {
							setIsPolygonShow(false);
						}
					});
				}}
				options={{
					// ограничение максимальной зоны отображения - граница России
					restrictMapArea: bordersOfRussia,
				}}
			>
				{isPolygonShow && coordsForArea ? (
					<Polygon
						geometry={coordsForArea}
						options={{
							fillColor: '#f54747',
							strokeColor: '#f50505',
							strokeWidth: 1,
							fillOpacity: 0.05,
							// strokeStyle: 'dash',
						}}
					/>
				) : null}
				{areaPath
					? points.map((point, index) => (
							<Placemark key={index} geometry={point} draggable />
						))
					: null}
				<Clusterer
					options={{
						preset: 'islands#invertedVioletClusterIcons',
						groupByCoordinates: false,
					}}
				>
					{areasToDisplay.map((area) => (
						<Placemark
							key={area.id}
							geometry={[parseFloat(area.latitude), parseFloat(area.longitude)]}
							properties={{
								balloonContentBody: `
								   <a class = "yandex-link" href="http://localhost:3000/sports-ground">
									<div class = "yandex">
									<img class = "yandex__images" src="${area.images.map((img) => img.image)}">
									<div class = "yandex__contetn">
									<h1 class = "yandex__title" >${area.name}</h1>
									<p class = "yandex__subtitle">${area.description}</p>
									<div class = "yandex__categories">
									<div class = "yandex__category">
									<img class = "yandex__small-img" src="https://avatars.mds.yandex.net/i?id=67ce2d97b46eb337086a0e3dde047b5a0815933b-4219583-images-thumbs&n=13" alt="значек категории">
									<p class = "yandex__small-text">${area.categories.map(
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
					))}
				</Clusterer>
			</Map>
		</div>
	);
}

YandexMap.propTypes = {
	areas: PropTypes.arrayOf.isRequired,
	setCoordinate: PropTypes.arrayOf.isRequired,
	setAdressText: PropTypes.arrayOf.isRequired,
	placeholder: PropTypes.arrayOf.isRequired,
};

export default YandexMap;

/* eslint-disable */
import React, { useState, useRef } from 'react';
import './YandexMap.scss';
import { Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import {
	displayBorder,
	bordersOfRussia,
	areasCoord,
} from '../../constants/MapConstants';

function YandexMap({ areas }) {
	const ref = useRef();
	const location = useLocation();
	const areaPath = location.pathname === '/app-area';

	const [points, setPoints] = useState([]);
	const [address, setAddress] = useState('');
	const [mapState, setMapState] = useState({
		center: [55.751426, 37.618879],
		zoom: 10,
		controls: ['zoomControl', 'fullscreenControl'],
	});

	const handleMapClick = React.useCallback((e, ymaps) => {
		const point = e.get('coords');
		setPoints([point]);
		ymaps.geocode(point).then((res) => {
			const firstGeoObject = res.geoObjects.get(0);
			const addressLine = firstGeoObject.getAddressLine();
			setAddress(addressLine);
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
					// console.log(bounds);
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

	const handleAreaChange = (event) => {
		const selectedArea = event.target.value;
		// console.log(selectedArea);
		areasCoord.find((area) => {
			const { place, coords } = area;
			// console.log(coords);
			if (place === selectedArea) {
				return ref.current.setBounds(coords, { checkZoomRange: true });
			}
			return null;
		});
	};

	return (
		<div className={areaPath ? 'map_area-app' : 'map'}>
			{/* <div  className={`map ${areaAppClass}`}> */}
			<div className="map__inputs map__inputs_aprea">
				<input
					type="text"
					className="map__search-bar map__search-bar_kinds-of-sports"
				/>
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
					placeholder="Введите адрес"
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
						ref.current.events.add('click', (e) => handleMapClick(e, ymaps));
					}
				}}
				options={{
					// ограничение максимальной зоны отображения - граница России
					restrictMapArea: bordersOfRussia,
				}}
			>
				{/* <Polygon
					geometry={[
						[
							[55.75, 37.8],
							[55.8, 37.9],
							[55.75, 38.0],
							[55.7, 38.0],
							[55.7, 37.8],
						],
						[
							[55.75, 37.82],
							[55.75, 37.98],
							[55.65, 37.9],
						],
					]}
					options={{
						fillColor: '#00FF00',
						strokeColor: '#0000FF',
						opacity: 0.5,
						strokeWidth: 5,
						strokeStyle: 'shortdash',
					}}
				/> */}
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
					{areas.map((area) => (
						<Placemark
							key={area.id}
							geometry={[parseFloat(area.latitude), parseFloat(area.longitude)]}
							properties={{
								balloonContentBody: `
									<div class = "yandex">
									<img class = "yandex__images" src="https://r4p.org/image/cache/data/msport_new/1-silnyj-dvor-nojabrsk/3_sil_dv/2-max-900.jpg">
									<div class = "yandex__contetn">
									<h1 class = "yandex__title" >Спортивная площадка</h1>
									<p class = "yandex__subtitle">Муниципальное автономное учреждение «Центр спортивных мероприятий Муниципальное автономное учреждение «Центр спортивных мероприятийМуниципальное автономное учреждение «Центр спортивных мероприятий </p>
									<div class = "yandex__categories">
									<div class = "yandex__category">
									<img class = "yandex__small-img" src="https://avatars.mds.yandex.net/i?id=67ce2d97b46eb337086a0e3dde047b5a0815933b-4219583-images-thumbs&n=13" alt="значек категории">
									<p class = "yandex__small-text">баскетболл</p>
									</div>
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
					))}
				</Clusterer>
			</Map>
		</div>
	);
}

YandexMap.propTypes = {
	areas: PropTypes.arrayOf.isRequired,
};

export default YandexMap;

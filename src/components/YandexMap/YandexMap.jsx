/* eslint-disable */
import React, { useState, useRef } from 'react';
import './YandexMap.scss';
import { Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import PropTypes from 'prop-types';

function YandexMap({ areas, areaAppClass }) {
	const ref = useRef();

	const [mapState, setMapState] = useState({
		center: [55.751426, 37.618879],
		zoom: 10,
		controls: ['zoomControl', 'fullscreenControl'],
	});

	const loadSuggest = (ymaps) => {
		//Подключение поисковой подсказки
		const suggestView = new ymaps.SuggestView('suggest', {
			//ограничение зоны поисковой подсказки
			boundedBy: [
				[55.503749, 37.286549],
				[56.009657, 37.967616],
			], // Границы Москвы
			strictBounds: [
				[55.503749, 37.286549], // Юго-Западный округ
				[56.009657, 37.967616], // Северо-Восточный округ
			],
		});
		let selectedItem = null;
		//Получение коодинат по поисковому запросу
		suggestView.events.add('select', (event) => {
			selectedItem = event.get('item');
			ymaps
				.geocode(selectedItem.value, {
					results: 2,
				})
				.then((res) => {
					const firstGeoObject = res.geoObjects.get(0);
					//координаты запрашиваемого обьекта
					const coords = firstGeoObject.geometry.getCoordinates();
					//координаты для корректного зума карты
					const bounds = firstGeoObject.properties.get('boundedBy');
					console.log(bounds);
					//обновление стейтов
					ref.current.setBounds(bounds, { checkZoomRange: true });
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

	return (
		<div className={`map ${areaAppClass}`}>
			<div className="map__inputs map__inputs_aprea">
				<input
					type="text"
					className="map__search-bar map__search-bar_kinds-of-sports"
				/>
				<input type="text" className="map__search-bar map__search-bar_area" />
				<input
					type="text"
					className="map__search-bar map__search-bar_type_search"
					id="suggest"
					placeholder="Введите адрес"
				/>
			</div>

			<Map
				instanceRef={ref}
				state={mapState}
				className="map__container"
				modules={['SuggestView', 'geocode', 'coordSystem.geo']}
				onLoad={(ymaps) => loadSuggest(ymaps)}
				options={{
					//ограничение максимальной зоны отображения - граница России
					restrictMapArea: [
						[41.185996, 19.484764],
						[81.886117, 191.128012],
					],
				}}
			>
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
									<div class = "yandex__category">
									<img class = "yandex__small-img" src="https://avatars.mds.yandex.net/i?id=67ce2d97b46eb337086a0e3dde047b5a0815933b-4219583-images-thumbs&n=13" alt="значек категории">
									<p class = "yandex__small-text">баскетболл</p>
									</div>
									<div class = "yandex__category">
									<img class = "yandex__small-img" src="https://avatars.mds.yandex.net/i?id=67ce2d97b46eb337086a0e3dde047b5a0815933b-4219583-images-thumbs&n=13" alt="значек категории">
									<p class = "yandex__small-text">баскетболл</p>
									</div>
									<div class = "yandex__category">
									<img class = "yandex__small-img" src="https://avatars.mds.yandex.net/i?id=67ce2d97b46eb337086a0e3dde047b5a0815933b-4219583-images-thumbs&n=13" alt="значек категории">
									<p class = "yandex__small-text">баскетболл</p>
									</div>
									<div class = "yandex__category">
									<img class = "yandex__small-img" src="https://avatars.mds.yandex.net/i?id=67ce2d97b46eb337086a0e3dde047b5a0815933b-4219583-images-thumbs&n=13" alt="значек категории">
									<p class = "yandex__small-text">баскетболл</p>
									</div>
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

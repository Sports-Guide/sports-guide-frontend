/* eslint-disable */
import React, { useState, useRef } from 'react';
import './YandexMap.scss';
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import PropTypes from 'prop-types';

function YandexMap({ areas, areaAppClass }) {
	const ref = useRef();

	const [mapState, setMapState] = useState({
		center: [55.751426, 37.618879],
		zoom: 10,
		controls: ['zoomControl', 'fullscreenControl'],
	});

	const loadSuggest = (ymaps) => {
		const suggestView = new ymaps.SuggestView('suggest');
		let selectedItem = null;
		suggestView.events.add('select', function (event) {
			selectedItem = event.get('item');
			ymaps
				.geocode(selectedItem.value, {
					results: 2,
				})
				.then(function (res) {
					var firstGeoObject = res.geoObjects.get(0),
						coords = firstGeoObject.geometry.getCoordinates();
					let bounds = firstGeoObject.properties.get('boundedBy');
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
			<div className="map__inputs">
				<input type="text" className="map__search-bar " />
				<input type="text" className="map__search-bar" />
				<input
					type="text"
					className="map__search-bar map__search-bar_type_search"
					id="suggest"
					placeholder="Введите адрес"
				/>
			</div>
			<YMaps
				query={{
					ns: 'use-load-option',
					load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
					apikey: 'c062e9ac-db0c-4d73-b5b2-71830702f484',
					suggest_apikey: '7841f93a-196d-47c1-9184-54f3c937df30',
				}}
			>
				<Map
					instanceRef={ref}
					state={mapState}
					className="map__container"
					modules={['SuggestView', 'geocode', 'coordSystem.geo']}
					onLoad={(ymaps) => loadSuggest(ymaps)}
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
								geometry={[
									parseFloat(area.latitude),
									parseFloat(area.longitude),
								]}
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
			</YMaps>
		</div>
	);
}

YandexMap.propTypes = {
	areas: PropTypes.arrayOf.isRequired,
};

export default YandexMap;

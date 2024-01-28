import React from 'react';
import './YandexMap.scss';
import { YMaps, Map, Placemark, SearchControl } from '@pbe/react-yandex-maps';

function YandexMap() {
	const defaultState = {
		center: [55.751426, 37.618879],
		zoom: 10,
		controls: ['zoomControl', 'fullscreenControl'],
	};

	// const { areas.latitude } = areas;
	// console.log(sportAreas);
	// function

	return (
		<div className="map">
			<YMaps
				query={{
					ns: 'use-load-option',
					load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
					apikey: 'c062e9ac-db0c-4d73-b5b2-71830702f484',
					suggest_apikey: '7841f93a-196d-47c1-9184-54f3c937df30',
				}}
				// className="map__container"
			>
				<Map
					defaultState={defaultState}
					className="map__container"
					// modules={['control.ZoomControl', 'control.FullscreenControl']}
				>
					<SearchControl options={{ float: 'right' }} />
					<Placemark
						modules={['geoObject.addon.balloon']}
						geometry={[55.751426, 37.618879]}
						properties={{
							balloonContent: '<div className="map__ballon">вывы</div>',
						}}
						className="map__ballon"
					/>
					<Placemark
						modules={['geoObject.addon.balloon']}
						geometry={[55.760162, 37.658502]}
						properties={{
							balloonContentBody: 'Hello, Курская!',
						}}
						className="map__ballon"
					/>
				</Map>
			</YMaps>
		</div>
	);
}

export default YandexMap;

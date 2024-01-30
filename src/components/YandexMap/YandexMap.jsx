/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './YandexMap.scss';
import {
	YMaps,
	Map,
	Placemark,
	SearchControl,
	Clusterer,
} from '@pbe/react-yandex-maps';
import PropTypes from 'prop-types';

function YandexMap({ areas, areaAppClass }) {
	const defaultState = {
		center: [55.751426, 37.618879],
		zoom: 10,
		controls: ['zoomControl', 'fullscreenControl'],
	};

	// function MapSuggestComponent(props) {
	// 	const { ymaps } = props;

	// 	React.useEffect(() => {
	// 		const suggestView = new ymaps.SuggestView('suggest');
	// 	}, [ymaps.SuggestView]);

	// 	return <input type="text" id="suggest" />;
	// }

	// const SuggestComponent = React.useMemo(() => {
	// 	return withYMaps(MapSuggestComponent, true, [
	// 		'SuggestView',
	// 		'geocode',
	// 		'coordSystem.geo',
	// 	]);
	// }, []);
	const loadSuggest = (ymaps) => {
		const suggestView = new ymaps.SuggestView('suggest');
	};

	return (
		<div className={`map ${areaAppClass}`}>
			{/* <SearchBar /> */}
			<input type="text" className="map__search-bar" id="suggest" />
			<YMaps
				query={{
					ns: 'use-load-option',
					load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
					apikey: 'c062e9ac-db0c-4d73-b5b2-71830702f484',
					suggest_apikey: '7841f93a-196d-47c1-9184-54f3c937df30',
				}}
			>
				{/* <SuggestComponent /> */}

				<Map
					defaultState={defaultState}
					className="map__container"
					modules={['SuggestView']}
					onLoad={(ymaps) => loadSuggest(ymaps)}
				>
					<SearchControl options={{ float: 'right' }} />
					<Clusterer
						options={{
							preset: 'islands#invertedVioletClusterIcons',
							groupByCoordinates: false,
						}}
					>
						{/* {points.map((coordinates) => (
							<Placemark geometry={coordinates} />
						))} */}
						{areas.map((area) => (
							<Placemark
								key={area.id}
								geometry={[
									parseFloat(area.latitude),
									parseFloat(area.longitude),
								]}
								properties={{ balloonContent: `ID: ${area.id}` }}
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

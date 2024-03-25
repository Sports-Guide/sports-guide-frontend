import React, { useState, useEffect, useCallback, useRef } from 'react';
import './YandexMap.scss';
import { Map, Placemark, Clusterer, Polygon } from '@pbe/react-yandex-maps';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetCoordsForArea } from '../../services/thunks/getCoordsForAreaThunk';
import { setAddress, setCoordinates } from '../../services/slices/areaSlice';
import {
	coordinatesSelector,
	areasToShowSelector,
	areasList,
	coordsForAreaList,
	coordsForAreaErrorMessage,
} from '../../services/selectors/areaSelector';
import { openModal } from '../../services/slices/modalSlice';
import {
	displayBorder,
	bordersOfRussia,
	areasCoord,
	defaultState,
} from '../../constants/MapConstants';

function YandexMap({
	isPolygonShow,
	setIsPolygonShow,
	selectedArea,
	isCardListShow,
}) {
	const location = useLocation();
	const ref = useRef();
	const areaPath = location.pathname === '/app-area';
	const dispatch = useDispatch();

	const areasToShow = useSelector(areasToShowSelector);
	const coordsForAreaError = useSelector(coordsForAreaErrorMessage);
	const areas = useSelector(areasList);
	const coordsForArea = useSelector(coordsForAreaList);
	const areasToDisplay = areaPath ? areas : areasToShow;

	const coordinates = useSelector(coordinatesSelector);
	const [mapState, setMapState] = useState(defaultState);

	// рендер границ округов
	useEffect(() => {
		if (!isCardListShow && selectedArea) {
			dispatch(fetchGetCoordsForArea(selectedArea));
		}
	}, [selectedArea, isCardListShow, dispatch]);

	useEffect(() => {
		if (coordsForAreaError) {
			dispatch(openModal('coordsForAreaError'));
		}
	}, [coordsForAreaError, dispatch]);

	// Добавление клика на карту, запись адреса и координат в стейт
	const handleMapClick = useCallback((e, ymaps) => {
		const point = e.get('coords');
		dispatch(setCoordinates([point]));
		ymaps.geocode(point).then((res) => {
			const firstGeoObject = res.geoObjects.get(0);
			const addressLine = firstGeoObject.getAddressLine();
			dispatch(setAddress(addressLine));
		}); // eslint-disable-next-line
	}, []);

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
			dispatch(setAddress(selectedItem.value));
			if (isCardListShow || !ref.current) {
				return;
			}
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
					dispatch(setCoordinates([coords]));
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

	// Зум при выборе округа
	useEffect(() => {
		if (isCardListShow || !ref.current) {
			return;
		}
		areasCoord.find((area) => {
			const { place, coords } = area;
			if (place === selectedArea) {
				return ref.current.setBounds(coords, { checkZoomRange: true });
			}
			return null;
		});
	}, [selectedArea, isCardListShow]);

	useEffect(() => {
		if (isPolygonShow) {
			ref.current.events.add('boundschange', (e) => {
				const newZoom = e.get('newZoom');
				if (newZoom >= 13) {
					setIsPolygonShow(false);
				}
			});
		}
	}, [isPolygonShow, setIsPolygonShow, isCardListShow]);

	return (
		<div className={areaPath ? 'map_area-app' : 'map'}>
			<Map
				instanceRef={ref}
				state={mapState}
				className="map__container"
				modules={['SuggestView', 'geocode', 'coordSystem.geo']}
				onLoad={(ymaps) => {
					loadSuggest(ymaps);
					if (areaPath) {
						// добавление клика на карту
						ref.current.events.add('click', (e) => handleMapClick(e, ymaps));
					}
					// if (isPolygonShow) {
					// 	ref.current.events.add('boundschange', (e) => {
					// 		const newZoom = e.get('newZoom');
					// 		if (newZoom >= 13) {
					// 			setIsPolygonShow(false);
					// 		}
					// 	});
					// }
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
						}}
					/>
				) : null}
				{areaPath
					? coordinates.map((point, index) => (
							// eslint-disable-next-line
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
							// href="http://localhost:3000/sports-ground/${
							// 		area.id
							// 	}"
							// href="https://sports-map.ru/sports-ground/${
							// 	area.id
							// }"
							properties={{
								balloonContentBody: `
								   <a class = "yandex-link"  href="https://sports-map.ru/sports-ground/${
											area.id
										}" target="_blank">
									<div class = "yandex">
									<img class="yandex__images" src="${area.images[0].image}">
									<div class = "yandex__contetn">
									<h1 class = "yandex__title" >${area.name}</h1>
									<p class = "yandex__subtitle">${area.address}</p>
									<div class = "yandex__categories">
									${area.categories
										.slice(0, 2)
										.map(
											(categor) =>
												`<div class = "yandex__category">
											<img class = "yandex__small-img" src="${categor.icon}" alt="значек категории">
											<p class = "yandex__small-text">${categor.name}</p>
											</div>`
										)
										.join('')}
									${
										area.categories.length > 2
											? '<span class="card__extra-categories">' +
												`+${area.categories.length - 2}` +
												'</span>'
											: ''
									}
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
	selectedArea: PropTypes.arrayOf.isRequired,
	isPolygonShow: PropTypes.bool.isRequired,
	setIsPolygonShow: PropTypes.func.isRequired,
	isCardListShow: PropTypes.bool.isRequired,
};

export default YandexMap;

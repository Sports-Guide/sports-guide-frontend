import React, { useState, useEffect, useCallback, useRef } from 'react';
import './YandexMap.scss';
import { Map, Placemark, Clusterer, Polygon } from '@pbe/react-yandex-maps';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetCoordsForArea } from '../../services/thunks/getCoordsForAreaThunk';
import {
	setAddress,
	setCoordinates,
	setIsPolygonShow,
} from '../../services/slices/areaSlice';
import {
	coordinatesSelector,
	areasToShowSelector,
	areasList,
	coordsForAreaList,
	coordsForAreaErrorMessage,
	isCardListShowStatus,
	isPolygonShowStatus,
	selectedAreaStatus,
} from '../../services/selectors/areaSelector';
import { openModal } from '../../services/slices/modalSlice';
import {
	displayBorder,
	bordersOfRussia,
	areasCoord,
	defaultState,
} from '../../constants/MapConstants';
import { renderImage } from '../../utils/renderImage';
import { Coordinates, SportGround } from '../../utils/types';
import { AppDispatch } from '../../services/store';

const YandexMap: React.FC = () => {
	const location = useLocation();
	const ref = useRef<any>(null);
	const areaPath = location.pathname === '/app-area';
	const dispatch: AppDispatch = useDispatch();

	const areasToShow = useSelector(areasToShowSelector);
	const selectedArea = useSelector(selectedAreaStatus);
	const coordsForAreaError = useSelector(coordsForAreaErrorMessage);
	const areas = useSelector(areasList);
	const coordsForArea = useSelector(coordsForAreaList);
	const isCardListShow = useSelector(isCardListShowStatus);
	const areasToDisplay = areaPath ? areas : areasToShow;

	const coordinates = useSelector(coordinatesSelector);
	const isPolygonShow = useSelector(isPolygonShowStatus);
	const [mapState, setMapState] = useState(defaultState);

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

	const handleMapClick = useCallback(
		(e: any, ymaps: any) => {
			const point: Coordinates = e.get('coords');
			dispatch(setCoordinates([point]));
			ymaps.geocode(point).then((res: any) => {
				const firstGeoObject = res.geoObjects.get(0);
				const addressLine = firstGeoObject.getAddressLine();
				dispatch(setAddress(addressLine));
			});
		},
		[dispatch]
	);

	const loadSuggest = (ymaps: any) => {
		const suggestView = new ymaps.SuggestView('suggest', {
			boundedBy: displayBorder,
			strictBounds: displayBorder,
		});
		let selectedItem: any = null;
		suggestView.events.add('select', (event: any) => {
			selectedItem = event.get('item');
			dispatch(setAddress(selectedItem.value));
			if (isCardListShow || !ref.current) {
				return;
			}
			ymaps
				.geocode(selectedItem.value, {
					results: 2,
				})
				.then((res: any) => {
					const firstGeoObject = res.geoObjects.get(0);
					const coords = firstGeoObject.geometry.getCoordinates();
					const bounds = firstGeoObject.properties.get('boundedBy');
					ref.current.setBounds(bounds, { checkZoomRange: true });
					dispatch(setCoordinates([coords]));
					setMapState((prevState) => ({
						...prevState,
						center: coords,
					}));
				})
				.catch((err: any) => {
					// eslint-disable-next-line
					console.log(err);
				});
		});
	};

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
		if (areaPath) {
			dispatch(setIsPolygonShow(false));
		}
		if (isPolygonShow && !areaPath) {
			ref.current.events.add('boundschange', (e: any) => {
				const newZoom = e.get('newZoom');
				if (newZoom >= 13) {
					dispatch(setIsPolygonShow(false));
				}
			});
		}
	}, [isPolygonShow, isCardListShow, dispatch, areaPath]);

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
						ref.current.events.add('click', (e: any) =>
							handleMapClick(e, ymaps)
						);
					}
				}}
				options={{
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
					? coordinates.map((point) => (
							<Placemark
								key={`${point[0]}-${point[1]}`}
								geometry={point}
								draggable
							/>
						))
					: null}
				<Clusterer
					options={{
						preset: 'islands#invertedVioletClusterIcons',
						groupByCoordinates: false,
					}}
				>
					{areasToDisplay.map((area: SportGround) => (
						<Placemark
							key={area.id}
							geometry={[parseFloat(area.latitude), parseFloat(area.longitude)]}
							properties={{
								balloonContentBody: `
                  <a class="yandex-link" href='/sports-ground/${
										area.id
									}' target="_blank">
                    <div class="yandex">
                      <img class="yandex__images" src="${renderImage(area)}">
                      <div class="yandex__content">
                        <h1 class="yandex__title">${area.name}</h1>
                        <p class="yandex__subtitle">${area.address}</p>
                        <div class="yandex__categories">
                          ${area.categories
														.slice(0, 2)
														.map(
															(category) =>
																`<div class="yandex__category">
                                  <img class="yandex__small-img" src="${category.icon}" alt="значок категории">
                                  <p class="yandex__small-text">${category.name}</p>
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
								visible: true,
								cursor: 'pointer',
							}}
						/>
					))}
				</Clusterer>
			</Map>
		</div>
	);
};

export default YandexMap;

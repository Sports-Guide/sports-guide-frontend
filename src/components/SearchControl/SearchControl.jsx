import React from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import 'leaflet-geosearch/dist/geosearch.css';
import customIcon from '../CustomIcon/CustomIcon';

export function SearchControl() {
	const map = useMap();

	React.useEffect(() => {
		const provider = new OpenStreetMapProvider();

		const searchControl = new GeoSearchControl({
			provider,
			autoCompleteDelay: 300,
			showMarker: true,
			retainZoomLevel: false,
			style: 'bar',
			showPopup: false,
			searchLabel: 'Введите адрес',
			marker: {
				icon: customIcon,
				draggable: true,
			},
		});

		map.addControl(searchControl);

		return () => map.removeControl(searchControl);
	}, [map]);

	return null;
}

export default SearchControl;

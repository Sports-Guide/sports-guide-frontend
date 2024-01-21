import React from 'react';
import './Main.scss';
import { Marker } from 'react-leaflet';
// import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
import MapComponent from '../Map/Map';
import { SearchControl } from '../SearchControl/SearchControl';
import customIcon from '../CustomIcon/CustomIcon';
import MarkerLayer from '../MarkerLayer/MarkerLayer';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';

export function Main() {
	const [newMarkers, setNewMarkers] = React.useState([]);

	return (
		<main>
			<WelcomeBanner />
			<Form label="Найти" />
			<MapComponent className="map-container_place_main">
				<SearchControl />
				<MarkerLayer newwMarkers={newMarkers} setNewMarkers={setNewMarkers} />
				{newMarkers.map((marker) => (
					<Marker position={marker} icon={customIcon} draggable />
				))}
			</MapComponent>
		</main>
	);
}

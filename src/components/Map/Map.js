import React from 'react';
import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';
import customIconImage from '../../images/location.png';
import Card from '../Card/Card';

const MapComponent = () => {
	const position = [55.75242311607481, 37.613489794839005];

	const markers = [
		{
			geocode: [55.82788644292732, 37.63814834212187],
			popUp: 'ВДНХ',
		},
		{
			geocode: [55.754059048216, 37.62079233067966],
			popUp: 'Красная площадь',
		},
		{
			geocode: [55.76073443315495, 37.61847798510204],
			popUp: 'Большой театр',
		},
	];

	const customIcon = new Icon({
		iconUrl: customIconImage,
		iconSize: [38, 38],
	});

	return (
		<MapContainer zoom={14} center={position} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{markers.map((marker) => (
				<Marker position={marker.geocode} icon={customIcon}>
					<Popup>
						{/* <h2>{marker.popUp}</h2> */}
						<Card />
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default MapComponent;

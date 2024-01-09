import React from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import PropTypes from 'prop-types';
import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { Card } from '../Card/Card';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import markers from '../../constants/markers';
import customIcon from '../CustomIcon/CustomIcon';

const MapComponent = ({ className, children }) => {
	const position = [55.75242311607481, 37.613489794839005];

	return (
		<div className={`map-container ${className}`}>
			<MapContainer
				className={`map ${className}`}
				zoom={14}
				center={position}
				scrollWheelZoom={false}
			>
				<div className="search-container">{children}</div>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MarkerClusterGroup>
					{markers.map((marker) => (
						<Marker position={marker.geocode} icon={customIcon}>
							<Popup>
								{/* <h2>{marker.popUp}</h2> */}
								<Card />
							</Popup>
						</Marker>
					))}
				</MarkerClusterGroup>
			</MapContainer>
		</div>
	);
};

MapComponent.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default MapComponent;

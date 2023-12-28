import React from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import PropTypes from 'prop-types';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapContainer, Popup, TileLayer, Marker, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import customIconImage from '../../images/location.png';
import { Card } from '../Card/Card';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import markers from '../../constants/markers';

const MapComponent = ({ className }) => {
	const position = [55.75242311607481, 37.613489794839005];

	const customIcon = new Icon({
		iconUrl: customIconImage,
		iconSize: [38, 38],
	});

	const AddSearchControl = () => {
		const map = useMap();

		React.useEffect(() => {
			const provider = new OpenStreetMapProvider();
			const searchControl = new GeoSearchControl({
				provider,
				autoCompleteDelay: 300,
				showMarker: false,
				retainZoomLevel: false,
				style: 'bar',
			});

			map.addControl(searchControl);

			return () => map.removeControl(searchControl);
		}, [map]);

		return null;
	};

	return (
		<div className={`map-container ${className}`}>
			<MapContainer
				className={`map ${className}`}
				zoom={14}
				center={position}
				scrollWheelZoom={false}
			>
				<div className="search-container">
					<AddSearchControl />
				</div>
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
};

export default MapComponent;

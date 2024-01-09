// import React from 'react';
import PropTypes from 'prop-types';
import { useMapEvents } from 'react-leaflet';

const MarkerLayer = ({ setNewMarkers }) => {
	const handleClick = (e) => {
		const { lat, lng } = e.latlng;
		setNewMarkers((prevMarkers) => [...prevMarkers, [lat, lng]]);
		console.log(lat, lng);
	};

	useMapEvents({
		click: handleClick,
	});

	return null;
};

MarkerLayer.propTypes = {
	setNewMarkers: PropTypes.func.isRequired,
};

export default MarkerLayer;

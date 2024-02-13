import React, { useEffect } from 'react';
import './Main.scss';
// import { Marker } from 'react-leaflet';
// // import PropTypes from 'prop-types';
// import { Form } from '../Form/Form';
// import MapComponent from '../Map/Map';
// import { SearchControl } from '../SearchControl/SearchControl';
// import customIcon from '../CustomIcon/CustomIcon';
// import MarkerLayer from '../MarkerLayer/MarkerLayer';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserActivation } from '../../services/thunks/registerUserThunk';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import YandexMap from '../YandexMap/YandexMap';
import { openModal } from '../../services/slices/modalSlice';

export function Main({ areas }) {
	// const [newMarkers, setNewMarkers] = React.useState([]);

	const { uid, token } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (uid && token) {
			dispatch(openModal('informActivation'));
			dispatch(fetchUserActivation({ uid, token }));
		}
	}, [uid, token, dispatch]);

	return (
		<main>
			<WelcomeBanner />
			{/* <Form label="Найти" />
			<MapComponent className="map-container_place_main">
				<SearchControl />
				<MarkerLayer newwMarkers={newMarkers} setNewMarkers={setNewMarkers} />
				{newMarkers.map((marker) => (
					<Marker position={marker} icon={customIcon} draggable />
				))}
			</MapComponent> */}

			<YandexMap areas={areas} placeholder="Название площадки или адрес" />
		</main>
	);
}

Main.propTypes = {
	areas: PropTypes.arrayOf.isRequired,
};

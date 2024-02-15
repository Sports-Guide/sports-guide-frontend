import React, { useEffect } from 'react';
import './Main.scss';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserActivation } from '../../services/thunks/registerUserThunk';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import YandexMap from '../YandexMap/YandexMap';
import { openModal } from '../../services/slices/modalSlice';

export function Main({ areas }) {
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
			<YandexMap areas={areas} placeholder="Название площадки или адрес" />
		</main>
	);
}

Main.propTypes = {
	areas: PropTypes.arrayOf.isRequired,
};

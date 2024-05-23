import React, { useEffect } from 'react';
import './Main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import YandexMap from '../../components/YandexMap/YandexMap';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import { fetchUserActivation } from '../../services/thunks/registerUserThunk';
import { openModal } from '../../services/slices/modalSlice';
import { setAreasToShow } from '../../services/slices/areaSlice';
import {
	areasList,
	areasErrorMessage,
	isCardListShowStatus,
} from '../../services/selectors/areaSelector';
import { AppDispatch } from '../../services/store';

const Main: React.FC = () => {
	const { uid, token } = useParams<{ uid: string; token: string }>();
	const dispatch: AppDispatch = useDispatch();
	const areas = useSelector(areasList);
	const areasError = useSelector(areasErrorMessage);
	const isCardListShow = useSelector(isCardListShowStatus);

	useEffect(() => {
		if (uid && token) {
			dispatch(openModal({ type: 'informActivation' }));
			dispatch(fetchUserActivation({ uid, token }));
		}
	}, [uid, token, dispatch]);

	useEffect(() => {
		if (areasError) {
			dispatch(openModal('getAreasError'));
		}
	}, [areasError, dispatch]);

	useEffect(() => {
		dispatch(setAreasToShow(areas));
	}, [areas, dispatch]);

	return (
		<main className="main">
			<SearchBar />
			{isCardListShow ? <CardList /> : <YandexMap />}
		</main>
	);
};

export default Main;

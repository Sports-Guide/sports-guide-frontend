import React, { useEffect, useState } from 'react';
import './Main.scss';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserActivation } from '../../services/thunks/registerUserThunk';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import YandexMap from '../YandexMap/YandexMap';
import { openModal } from '../../services/slices/modalSlice';
import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';

export function Main({
	areas,
	address,
	setAddress,
	areasToShow,
	setAreasToShow,
	coordinates,
	setCoordinates,
}) {
	const { uid, token } = useParams();
	const dispatch = useDispatch();

	const [selectedArea, setSelectedArea] = useState('');
	const [isPolygonShow, setIsPolygonShow] = useState(false);
	const [isCardListShow, setIsCardListShow] = useState(false);

	useEffect(() => {
		if (uid && token) {
			dispatch(openModal('informActivation'));
			dispatch(fetchUserActivation({ uid, token }));
		}
	}, [uid, token, dispatch]);

	// фильтрация по категории
	const handleCategoryChange = (event) => {
		const selectedCategory = event.target.value;
		if (selectedCategory === 'Вид спорта') {
			return setAreasToShow(areas);
		}
		const filteredAreas = areas.filter((area) =>
			area.categories.some((category) => category.name === selectedCategory)
		);
		return setAreasToShow(filteredAreas);
	};

	// Выбор округа
	const handleAreaChange = (event) => {
		if (isCardListShow) {
			return;
		}
		setIsPolygonShow(true);
		const selectedCurrentArea = event.target.value;
		if (selectedCurrentArea === 'Все округа') {
			setSelectedArea('город Москва');
		}
		setSelectedArea(selectedCurrentArea);
	};

	useEffect(() => {
		setAreasToShow(areas);
	}, [areas, setAreasToShow]);

	return (
		<main className="main">
			<WelcomeBanner />
			<SearchBar
				handleCategoryChange={handleCategoryChange}
				handleAreaChange={handleAreaChange}
				address={address}
				setAddress={setAddress}
				setIsCardListShow={setIsCardListShow}
				isCardListShow={isCardListShow}
			/>
			{isCardListShow ? (
				<CardList areasToShow={areasToShow} />
			) : (
				<YandexMap
					areas={areas}
					handleAreaChange={handleAreaChange}
					areasToShow={areasToShow}
					selectedArea={selectedArea}
					isPolygonShow={isPolygonShow}
					setAddress={setAddress}
					coordinates={coordinates}
					setCoordinates={setCoordinates}
					isCardListShow={isCardListShow}
				/>
			)}
		</main>
	);
}

Main.propTypes = {
	areas: PropTypes.arrayOf.isRequired,
	address: PropTypes.string.isRequired,
	setAddress: PropTypes.string.isRequired,
	areasToShow: PropTypes.arrayOf.isRequired,
	setAreasToShow: PropTypes.arrayOf.isRequired,
	coordinates: PropTypes.arrayOf.isRequired,
	setCoordinates: PropTypes.arrayOf.isRequired,
};

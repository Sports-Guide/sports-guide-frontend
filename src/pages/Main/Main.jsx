import React, { useEffect, useState } from 'react';
import './Main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import YandexMap from '../../components/YandexMap/YandexMap';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import { fetchUserActivation } from '../../services/thunks/registerUserThunk';
import { openModal } from '../../services/slices/modalSlice';
import { setAreasToShow } from '../../services/slices/areaSlice';
import { areasList } from '../../services/selectors/areaSelector';

export default function Main() {
	const { uid, token } = useParams();
	const dispatch = useDispatch();
	const areas = useSelector(areasList);

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
			return dispatch(setAreasToShow(areas));
		}
		const filteredAreas = areas.filter((area) =>
			area.categories.some((category) => category.name === selectedCategory)
		);
		return dispatch(setAreasToShow(filteredAreas));
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
			return;
		}
		setSelectedArea(selectedCurrentArea);
	};

	useEffect(() => {
		dispatch(setAreasToShow(areas));
	}, [areas, dispatch]);

	return (
		<main className="main">
			<SearchBar
				handleCategoryChange={handleCategoryChange}
				handleAreaChange={handleAreaChange}
				setIsCardListShow={setIsCardListShow}
				isCardListShow={isCardListShow}
				setIsPolygonShow={setIsPolygonShow}
			/>
			{isCardListShow ? (
				<CardList />
			) : (
				<YandexMap
					handleAreaChange={handleAreaChange}
					selectedArea={selectedArea}
					isPolygonShow={isPolygonShow}
					setIsPolygonShow={setIsPolygonShow}
					isCardListShow={isCardListShow}
				/>
			)}
		</main>
	);
}

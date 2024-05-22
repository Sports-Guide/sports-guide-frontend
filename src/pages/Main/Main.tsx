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
import {
	areasList,
	areasErrorMessage,
} from '../../services/selectors/areaSelector';
import { AppDispatch } from '../../services/store';

const Main: React.FC = () => {
	const { uid, token } = useParams<{ uid: string; token: string }>();
	const dispatch: AppDispatch = useDispatch();
	const areas = useSelector(areasList);
	const areasError = useSelector(areasErrorMessage);

	const [selectedArea, setSelectedArea] = useState<string>('');
	const [isPolygonShow, setIsPolygonShow] = useState<boolean>(false);
	const [isCardListShow, setIsCardListShow] = useState<boolean>(false);

	useEffect(() => {
		if (areasError) {
			dispatch(openModal('getAreasError'));
		}
	}, [areasError, dispatch]);

	useEffect(() => {
		if (uid && token) {
			dispatch(openModal({ type: 'informActivation' }));
			dispatch(fetchUserActivation({ uid, token }));
		}
	}, [uid, token, dispatch]);

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedCategory = event.target.value;
		if (selectedCategory === 'Вид спорта') {
			return dispatch(setAreasToShow(areas));
		}
		const filteredAreas = areas.filter((area) =>
			area.categories.some((category) => category.name === selectedCategory)
		);
		return dispatch(setAreasToShow(filteredAreas));
	};

	const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
					selectedArea={selectedArea}
					isPolygonShow={isPolygonShow}
					setIsPolygonShow={setIsPolygonShow}
					isCardListShow={isCardListShow}
				/>
			)}
		</main>
	);
};

export default Main;
